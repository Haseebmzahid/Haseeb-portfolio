import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const output =
  process.env.QA_OUTPUT ?? path.join(process.cwd(), "test-results");
const base = process.env.QA_URL ?? "http://127.0.0.1:3000";
fs.mkdirSync(output, { recursive: true });
const brave =
  "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.QA_BROWSER ??
    (fs.existsSync(chromium.executablePath())
      ? chromium.executablePath()
      : fs.existsSync(brave)
        ? brave
        : undefined),
  args: ["--enable-unsafe-swiftshader"],
});
const results = [];
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["laptop", 1280, 800],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
  ]) {
    if (process.env.QA_VIEWPORT && name !== process.env.QA_VIEWPORT) continue;
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    const errors = [];
    const failed = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        !message.text().includes("400 (Bad Request)")
      )
        errors.push(message.text());
    });
    page.on("response", (r) => {
      if (r.status() >= 400 && !r.url().includes("/api/contact"))
        failed.push({ url: r.url(), status: r.status() });
    });
    await page.goto(base, { waitUntil: "networkidle", timeout: 180000 });
    await page.locator("h1").waitFor();
    if (width > 768)
      await expect(page.locator(".hero-stage")).toHaveAttribute(
        "data-scene-ready",
        "true",
        { timeout: 60000 },
      );
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
    console.log(
      name,
      await page.title(),
      "canvas:",
      await page.locator("canvas").count(),
    );
    const overflow = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(overflow.document).toBe(width);
    for (let i = 0; i < 5; i++) {
      const button = page.locator(".project-switcher button").nth(i);
      await button.click();
      if ((await button.getAttribute("aria-pressed")) !== "true")
        throw Error("Project switch failed");
      if (
        width <= 768 &&
        !(
          await page.locator(".fallback-screen img").getAttribute("src")
        ).includes(
          ["foreseeme", "omnichannel", "finflow", "royal", "estimation"][i],
        )
      )
        throw Error("Fallback screen did not change");
      if (name === "desktop") {
        await page.waitForTimeout(800);
        await page
          .locator(".hero-stage")
          .screenshot({ path: path.join(output, `screen-${i + 1}.png`) });
      }
    }
    await expect(page.locator(".case-study")).toHaveCount(5);
    for (const id of ["foreseeme", "finflow"]) {
      const visual = page.locator(`[data-product="${id}"]`);
      await visual.scrollIntoViewIfNeeded();
      if (width > 768)
        await expect(visual).toHaveAttribute("data-scene-ready", "true", {
          timeout: 60000,
        });
      await visual.locator(".product-view-controls button").nth(1).click();
      await expect(visual).toHaveAttribute("data-view", "1");
      await page.waitForTimeout(800);
      await visual.screenshot({
        style: ".nav-shell{visibility:hidden}",
        path: path.join(output, `${name}-${id}.png`),
      });
    }
    const finflow = page.locator('[data-product="finflow"]');
    await finflow.locator(".product-view-controls button").nth(2).click();
    await expect(finflow).toHaveAttribute("data-view", "2");
    await page.waitForTimeout(250);
    await finflow.screenshot({
      style: ".nav-shell{visibility:hidden}",
      path: path.join(output, `${name}-finflow-ai.png`),
    });
    const agent = page.locator('[data-product="omnichannel"]');
    await agent.scrollIntoViewIfNeeded();
    if (width > 768)
      await expect(agent).toHaveAttribute("data-scene-ready", "true", {
        timeout: 60000,
      });
    for (const channel of ["WhatsApp", "Instagram", "Messenger"]) {
      const button = agent.getByRole("button", { name: channel, exact: true });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
    }
    await agent.getByRole("button", { name: "Show Urdu conversation" }).click();
    await expect(agent.locator(".message-bubble.patient")).toHaveAttribute(
      "lang",
      "ur",
    );
    await agent
      .getByRole("button", { name: "Show English conversation" })
      .click();
    await agent.getByRole("button", { name: "Reserve sample slot" }).click();
    await expect(agent.locator(".reservation-feedback")).toContainText(
      "10:30 reserved",
    );
    await expect(agent.locator(".slot-options button").first()).toBeDisabled();
    await expect(agent.locator(".slot-options button").nth(1)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await agent.screenshot({
      style: ".nav-shell{visibility:hidden}",
      path: path.join(output, `${name}-omnichannel.png`),
    });
    await agent.getByRole("button", { name: "Reserve sample slot" }).click();
    await agent.getByRole("button", { name: "Reserve sample slot" }).click();
    await expect(
      agent.getByRole("button", { name: "All sample slots reserved" }),
    ).toBeDisabled();
    for (let i = 0; i < 5; i++) {
      await agent.locator(".routing-controls button").nth(i).click();
      await expect(agent).toHaveAttribute("data-step", String(i));
    }
    await expect(
      page.locator('#project-foreseeme a[href*="ForeSEEME"]'),
    ).toHaveCount(0);
    await expect(page.locator(".education-record")).toContainText(
      "COMSATS University Islamabad",
    );
    await expect(page.locator(".qualification")).toHaveCount(3);
    await expect(page.locator("#experience-0")).toContainText("2023 – 2025");
    await expect(page.locator("#experience-1")).toContainText("2025 – Present");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page
      .locator("#about img")
      .evaluateAll((images) => Promise.all(images.map((i) => i.decode())));
    for (let i = 0; i < 3; i++) {
      await page
        .getByRole("button", { name: `Show portrait ${i + 1}:`, exact: false })
        .click();
      await expect(page.locator(".portrait-frame.is-active")).toHaveAttribute(
        "data-cut",
        String(i),
      );
    }
    await page.waitForTimeout(1100);
    await page.locator("#about").screenshot({
      style: ".nav-shell{visibility:hidden}",
      path: path.join(output, `${name}-about.png`),
    });
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await page
      .locator(".constellation-portrait img")
      .evaluateAll((images) => Promise.all(images.map((img) => img.decode())));
    await page.waitForTimeout(900);
    if (width < 1000)
      await page.locator(".constellation").screenshot({
        style: ".nav-shell{visibility:hidden}",
        path: path.join(output, `${name}-constellation.png`),
      });
    if (width >= 1000) {
      await expect(page.locator(".orbit-node")).toHaveCount(5, {
        timeout: 60000,
      });
      await page
        .getByRole("button", { name: "Pause ambient motion", exact: true })
        .click();
      await page.waitForTimeout(400);
      await page.locator(".constellation").screenshot({
        style: ".nav-shell{visibility:hidden}",
        path: path.join(output, `${name}-constellation.png`),
      });
      await page.locator(".orbit-node").first().click();
      await expect(page.locator("#experience-0")).toHaveAttribute("open", "");
      await page
        .getByRole("button", { name: "Return to constellation" })
        .click();
    }
    for (let i = 0; i < 5; i++) {
      await page.locator(`#experience-${i} summary`).click();
      await expect(page.locator(`#experience-${i}`)).toHaveAttribute(
        "open",
        "",
      );
    }
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const invalid = page.waitForResponse(
      (r) => r.url().endsWith("/api/contact"),
      { timeout: 90000 },
    );
    await page
      .getByRole("button", { name: "Send Message", exact: true })
      .click();
    const response = await invalid;
    if (response.status() !== 400)
      throw Error(`Expected real validation 400, got ${response.status()}`);
    await page.locator("#name-error").waitFor();
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "QA mocked success — no database record written",
        }),
      }),
    );
    await page.getByLabel("Your name", { exact: true }).fill("Portfolio QA");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("qa@example.com");
    await page
      .getByLabel("A little about your idea")
      .fill("Automated form state verification, intercepted before database.");
    await page
      .getByRole("button", { name: "Send Message", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Message sent", exact: true })
      .waitFor();
    if (width <= 768) {
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      await page.locator("#mobile-navigation a").first().click();
      if (await page.locator("#mobile-navigation").count())
        throw Error("Mobile menu stayed open");
    }
    await page.reload({ waitUntil: "networkidle" });
    await page.locator("img").evaluateAll((images) => {
      for (const img of images) img.loading = "eager";
      return Promise.all(images.map((img) => img.decode()));
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    if (width > 768)
      await expect(page.locator(".hero-stage")).toHaveAttribute(
        "data-scene-ready",
        "true",
        { timeout: 60000 },
      );
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(output, `${name}-full.png`),
      fullPage: true,
    });
    const missingImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
      );
    expect(missingImages).toEqual([]);
    const finalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(finalOverflow).toBe(width);
    expect(errors).toEqual([]);
    expect(failed).toEqual([]);
    results.push({
      name,
      width,
      height,
      overflow,
      finalOverflow,
      errors,
      failed,
      missingImages,
      interactionChecks:
        "five laptop displays, two product screen switches, three channels, English/Urdu, sample slot reservation and exhaustion, five workflow stages, qualifications and corrected roles, three portraits, five timeline records, real API validation, mocked success, mobile navigation",
    });
    await page.close();
  }
} finally {
  await browser.close();
  fs.writeFileSync(
    path.join(output, "browser-results.json"),
    JSON.stringify(results, null, 2),
  );
}
console.log(JSON.stringify(results, null, 2));
