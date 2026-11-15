import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const output =
  process.env.QA_OUTPUT ?? path.join(process.cwd(), "test-results");
const base = process.env.QA_URL ?? "http://127.0.0.1:3000";
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
const results = {
  environment:
    "Local production server; headless Chromium/Brave, unthrottled desktop hardware. WebGL may use SwiftShader. These are lab observations, not Lighthouse or field scores.",
  loading: [],
  checks: [],
};
fs.mkdirSync(output, { recursive: true });
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["mobile", 390, 844],
  ]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.addInitScript(() => {
      window.__qa = { lcp: 0, cls: 0, sceneReady: 0 };
      const readyObserver=new MutationObserver(()=>{
        if(document.querySelector('.hero-stage')?.getAttribute('data-scene-ready')==='true'){
          window.__qa.sceneReady=performance.now();readyObserver.disconnect();
        }
      });
      readyObserver.observe(document,{childList:true,subtree:true,attributes:true,attributeFilter:['data-scene-ready']});
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) window.__qa.lcp = e.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const e of list.getEntries())
          if (!e.hadRecentInput) window.__qa.cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
    if (width > 768)
      await expect(page.locator(".hero-stage")).toHaveAttribute(
        "data-scene-ready",
        "true",
        { timeout: 60000 },
      );
    const sceneReadyMs =
      width > 768 ? await page.evaluate(() => window.__qa.sceneReady) : null;
    await page.waitForTimeout(1500);
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const r = performance.getEntriesByType("resource");
      const canvas = document.querySelector("canvas");
      const gl = canvas?.getContext("webgl2");
      return {
        ttfb: nav.responseStart,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]
          ?.startTime,
        lcp: window.__qa.lcp,
        cls: window.__qa.cls,
        domContentLoaded: nav.domContentLoadedEventEnd,
        load: nav.loadEventEnd,
        resourceCount: r.length,
        transferredBytes: r.reduce(
          (n, e) => n + e.transferSize,
          nav.transferSize,
        ),
        jsTransferBytes: r
          .filter((e) => e.name.includes(".js"))
          .reduce((n, e) => n + e.transferSize, 0),
        canvasCount: document.querySelectorAll("canvas").length,
        gpu: gl?.getParameter(gl.RENDERER),
      };
    });
    const frames = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const samples = [];
          let previous = performance.now();
          function sample(now) {
            samples.push(now - previous);
            previous = now;
            if (samples.length < 90) requestAnimationFrame(sample);
            else {
              samples.shift();
              samples.sort((a, b) => a - b);
              resolve({
                meanFrameMs:
                  samples.reduce((n, x) => n + x, 0) / samples.length,
                p95FrameMs: samples[Math.floor(samples.length * 0.95)],
                sampledFrames: samples.length,
              });
            }
          }
          requestAnimationFrame(sample);
        }),
    );
    results.loading.push({ name, sceneReadyMs, ...metrics, ...frames, errors });
    await page.screenshot({ path: path.join(output, `${name}-hero.png`) });
    const anchors = await page.locator('a[href^="#"]').evaluateAll((a) =>
      a.map((x) => ({
        href: x.getAttribute("href"),
        exists: !!document.getElementById(x.hash.slice(1)),
      })),
    );
    if (anchors.some((a) => !a.exists)) throw Error("Broken internal anchor");
    const resume = await page.request.get(base + "/Haseeb-Zahid-Resume.pdf");
    expect(resume.status()).toBe(200);
    const socialLinks = await page
      .locator(".hero-socials a")
      .evaluateAll((links) =>
        links.map((a) => ({
          href: a.getAttribute("href"),
          target: a.getAttribute("target"),
          rel: a.getAttribute("rel"),
        })),
      );
    expect(socialLinks.map((a) => a.href)).toEqual([
      "https://github.com/Haseebmzahid",
      "https://www.linkedin.com/in/m-haseeb-zahid-033ab632a/",
      "mailto:haseebg460@gmail.com",
    ]);
    for (const link of socialLinks.slice(0, 2)) {
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
    }
    for (const asset of [
      "/icon.svg",
      "/apple-touch-icon.png",
      "/og-image.png",
      "/robots.txt",
      "/sitemap.xml",
    ])
      expect((await page.request.get(base + asset)).status()).toBe(200);
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
    const display = page.locator(".project-switcher button").nth(2);
    await display.focus();
    await page.keyboard.press("Enter");
    await expect(display).toHaveAttribute("aria-pressed", "true");
    const downloadEvent = page.waitForEvent("download");
    await page
      .getByRole("link", { name: "Download Résumé", exact: true })
      .click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe("Haseeb-Zahid-Resume.pdf");
    await download.cancel();
    if (width > 768) {
      await page.mouse.move(1200, 400);
      const before = await page.locator(".hero-stage canvas").screenshot();
      await page.mouse.move(700, 600);
      await page.waitForTimeout(800);
      const after = await page.locator(".hero-stage canvas").screenshot();
      expect(crypto.createHash("sha256").update(before).digest("hex")).not.toBe(
        crypto.createHash("sha256").update(after).digest("hex"),
      );
      await page
        .getByRole("button", { name: "Pause ambient motion", exact: true })
        .click();
      await page.waitForTimeout(200);
      const a = await page.locator(".hero-stage canvas").screenshot();
      await page.waitForTimeout(500);
      const b = await page.locator(".hero-stage canvas").screenshot();
      expect(a.equals(b)).toBe(true);
      await page
        .getByRole("button", { name: "Resume ambient motion", exact: true })
        .click();
      const nav = page.locator(".floating-nav");
      const navBox = await nav.boundingBox();
      await page.mouse.move(
        navBox.x + navBox.width * 0.8,
        navBox.y + navBox.height * 0.5,
      );
      const glassX = await nav.evaluate((el) =>
        el.style.getPropertyValue("--glass-x"),
      );
      expect(glassX).not.toBe("");
      for (const id of ["foreseeme", "omnichannel", "finflow"]) {
        const visual = page.locator(`[data-product="${id}"]`);
        await visual.scrollIntoViewIfNeeded();
        await expect(visual).toHaveAttribute("data-scene-ready", "true", {
          timeout: 60000,
        });
        const canvas = visual.locator("canvas");
        await page.waitForTimeout(250);
        const movingA = await canvas.screenshot({
          style: ".nav-shell{visibility:hidden}",
        });
        await page.waitForTimeout(600);
        const movingB = await canvas.screenshot({
          style: ".nav-shell{visibility:hidden}",
        });
        expect(movingA.equals(movingB)).toBe(false);
        await page
          .getByRole("button", { name: "Pause ambient motion", exact: true })
          .click();
        await page.waitForTimeout(250);
        const pausedA = await canvas.screenshot({
          style: ".nav-shell{visibility:hidden}",
        });
        await page.waitForTimeout(500);
        const pausedB = await canvas.screenshot({
          style: ".nav-shell{visibility:hidden}",
        });
        expect(pausedA.equals(pausedB)).toBe(true);
        if (id !== "omnichannel") {
          await visual.locator(".product-view-controls button").nth(1).click();
          await page.waitForTimeout(200);
          const switched = await canvas.screenshot({
            style: ".nav-shell{visibility:hidden}",
          });
          expect(switched.equals(pausedB)).toBe(false);
        }
        if (id === "finflow") {
          await visual.locator(".product-view-controls button").nth(2).click();
          await page.waitForTimeout(200);
          const ai = await canvas.screenshot({
            style: ".nav-shell{visibility:hidden}",
          });
          expect(ai.equals(pausedB)).toBe(false);
        }
        await page
          .getByRole("button", { name: "Resume ambient motion", exact: true })
          .click();
        results.checks.push({
          name: id,
          passed:
            "actual animated canvas pixels, stable global pause" +
            (id !== "omnichannel"
              ? ", actual display content change with motion paused"
              : ""),
        });
      }
      await page.locator("#experience").scrollIntoViewIfNeeded();
      await expect(page.locator(".orbit-node")).toHaveCount(5);
      await page.waitForTimeout(300);
      const pos1 = await page.locator(".orbit-node").first().boundingBox();
      await page.waitForTimeout(600);
      const pos2 = await page.locator(".orbit-node").first().boundingBox();
      expect(
        Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y),
      ).toBeGreaterThan(1);
      await page.locator(".orbit-node").first().focus();
      await page.waitForTimeout(200);
      const focused1 = await page.locator(".orbit-node").first().boundingBox();
      await page.waitForTimeout(500);
      const focused2 = await page.locator(".orbit-node").first().boundingBox();
      expect(
        Math.abs(focused1.x - focused2.x) + Math.abs(focused1.y - focused2.y),
      ).toBeLessThan(0.1);
    }
    results.checks.push({
      name,
      passed:
        "all internal anchors and metadata assets, résumé response, keyboard skip link and project selection" +
        (width > 768
          ? ", actual laptop pixel changes, global pause pixel stability, all five 3D nodes, actual node movement and focus pause"
          : ""),
    });
    await page.close();
  }
  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await reduced.goto(base, { waitUntil: "networkidle" });
  await expect(reduced.locator(".hero-stage")).toHaveAttribute(
    "data-scene-ready",
    "true",
    { timeout: 60000 },
  );
  await reduced.waitForTimeout(600);
  const first = await reduced.locator(".hero-stage canvas").screenshot();
  await reduced.waitForTimeout(600);
  const second = await reduced.locator(".hero-stage canvas").screenshot();
  expect(first.equals(second)).toBe(true);
  expect(
    await reduced.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  results.checks.push({
    name: "reduced-motion",
    passed: "static canvas pixels over 600ms and automatic scrolling disabled",
  });
  await reduced.screenshot({ path: path.join(output, "reduced-motion.png") });
  for (const id of ["foreseeme", "omnichannel", "finflow"]) {
    const visual = reduced.locator(`[data-product="${id}"]`);
    await visual.scrollIntoViewIfNeeded();
    await expect(visual).toHaveAttribute("data-scene-ready", "true", {
      timeout: 60000,
    });
    await reduced.waitForTimeout(400);
    const canvas = visual.locator("canvas");
    const a = await canvas.screenshot({
      style: ".nav-shell{visibility:hidden}",
    });
    await reduced.waitForTimeout(500);
    const b = await canvas.screenshot({
      style: ".nav-shell{visibility:hidden}",
    });
    expect(a.equals(b)).toBe(true);
    results.checks.push({
      name: `${id}-reduced-motion`,
      passed: "static canvas pixels",
    });
  }
  await reduced.evaluate(() => {
    const section = document.createElement("div");
    section.id = "font-specimen";
    section.style.cssText =
      "position:fixed;inset:0;z-index:99999;background:#0b0d10;color:#eeede8;padding:65px;font-size:56px;line-height:1.3";
    section.innerHTML =
      '<p style="font:12px monospace;letter-spacing:3px;color:#9aabb8;margin-bottom:40px">TYPOGRAPHIC COMPARISON / HASEEB ZAHID</p><p style="font-family:var(--font-geist-sans)">Geist / I turn complexity into clarity.</p><p style="font-family:Arial;margin-top:30px">Arial / I turn complexity into clarity.</p><p style="font-family:Georgia;font-style:italic;margin-top:30px;color:#c4dcec">Georgia / A human perspective.</p><p style="font:13px var(--font-geist-mono);margin-top:50px;color:#8a9aa8">Retain Geist for structure. Georgia italic for editorial warmth. Mono for indexes.</p>';
    document.body.appendChild(section);
  });
  await reduced.screenshot({
    path: path.join(output, "typography-comparison.png"),
  });
} finally {
  await browser.close();
  fs.writeFileSync(
    path.join(output, "performance-results.json"),
    JSON.stringify(results, null, 2),
  );
}
console.log(JSON.stringify(results, null, 2));
