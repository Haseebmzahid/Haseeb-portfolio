import fs from "node:fs";

// Original product studies. No patient, health or market feed is connected.
const out = "public/displays";
fs.mkdirSync(out, { recursive: true });
const r = (x, y, w, h, fill, rx = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const t = (x, y, content, size = 16, fill = "#768982", attrs = "") =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${attrs}>${content}</text>`;
const svg = (body, w = 390, h = 844, bg = "#eef3ed") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${r(0, 0, w, h, bg, 28)}<g font-family="Arial,sans-serif">${body}</g></svg>`;
function health(mode) {
  let b =
    t(28, 45, "9:41", 13, "#314b42", 'font-weight="bold"') +
    t(314, 45, "DEMO", 9) +
    t(28, 104, "foresee", 30, "#294a3c", 'font-weight="bold"') +
    t(130, 104, "me", 30, "#729783") +
    t(28, 138, "YOUR HEALTH, IN CONTEXT", 9, "#789084", 'letter-spacing="2"');
  if (mode === 0) {
    b +=
      t(28, 195, "A little care.", 31, "#294a3c") +
      t(28, 231, "Every day.", 31, "#294a3c") +
      r(25, 268, 340, 144, "#dce8dc", 20) +
      t(46, 301, "TODAY’S ROUTINE", 10, "#65816f", 'letter-spacing="1"') +
      t(46, 348, "Your next reminder", 23, "#294a3c") +
      t(46, 380, "18:00  /  Scheduled medication", 13, "#65816f") +
      t(28, 455, "Medication timeline", 18, "#294a3c");
    [
      "08:00 · Morning routine",
      "18:00 · Evening reminder",
      "21:00 · Daily check-in",
    ].forEach((s, i) => {
      b +=
        r(25, 478 + i * 68, 340, 55, "#ffffff", 12) +
        `<circle cx="49" cy="${506 + i * 68}" r="9" fill="${i === 0 ? "#7b9c82" : "#e3ece4"}"/>` +
        t(70, 511 + i * 68, s, 13, "#456251");
    });
    b +=
      r(25, 711, 340, 61, "#294a3c", 16) +
      t(49, 747, "Your routine. Kept in view.", 15, "#e4eee3");
  } else {
    b +=
      t(28, 194, "Know your", 31, "#294a3c") +
      t(28, 230, "surroundings.", 31, "#294a3c") +
      r(25, 267, 340, 235, "#dce8dc", 22) +
      `<g fill="none" stroke="#8cae99"><circle cx="195" cy="369" r="78"/><circle cx="195" cy="369" r="53"/><circle cx="195" cy="369" r="28"/><path d="M117 369h156M195 291v156" opacity=".4"/></g><circle cx="195" cy="369" r="8" fill="#4f7b60"/>` +
      t(49, 298, "ENVIRONMENTAL CONTEXT", 9, "#65816f", 'letter-spacing="1"') +
      t(113, 480, "Sample location signal", 12, "#456251") +
      r(25, 526, 340, 129, "#ffffff", 18) +
      t(46, 560, "Stay informed", 20, "#294a3c") +
      t(46, 589, "Environmental factors can inform", 13) +
      t(46, 611, "health and outbreak awareness.", 13) +
      r(25, 680, 340, 92, "#294a3c", 17) +
      t(46, 716, "Context → Intelligence → Alert", 15, "#e4eee3") +
      t(46, 745, "Illustrative signal, not a live advisory", 10, "#a9c2b0");
  }
  b +=
    t(66, 813, "Routine", 11, "#789084") +
    t(252, 813, "Environment", 11, "#789084");
  return svg(b);
}
for (let i = 0; i < 2; i++) {
  fs.writeFileSync(`${out}/foreseeme-phone-${i}.svg`, health(i));
}
// Desktop display compositions are deliberately distinct from the phone texture.
function desktopHealth() {
  let b =
    t(66, 84, "ForeSeeMe", 36, "#294a3c", 'font-weight="bold"') +
    t(
      66,
      125,
      "HEALTH INTELLIGENCE / FINAL-YEAR PROJECT",
      12,
      "#789084",
      'letter-spacing="3"',
    ) +
    t(66, 279, "Health, with", 72, "#294a3c") +
    t(66, 362, "foresight.", 72, "#294a3c") +
    t(66, 435, "Personal routines. Environmental awareness.", 21) +
    t(66, 469, "A connected picture of everyday health.", 21) +
    r(66, 550, 490, 107, "#dce8dc", 20) +
    t(92, 586, "MEDICATION ROUTINE", 12, "#65816f", 'letter-spacing="2"') +
    t(92, 625, "The next reminder, kept in view.", 23, "#294a3c") +
    r(66, 683, 490, 107, "#ffffff", 20) +
    t(
      92,
      719,
      "ENVIRONMENTAL INTELLIGENCE",
      12,
      "#65816f",
      'letter-spacing="2"',
    ) +
    t(92, 758, "Context that helps you stay informed.", 21, "#294a3c");
  b +=
    `<g transform="translate(738 60) scale(.88)">${health(0)
      .replace(/<svg[^>]*>/, "<g>")
      .replace("</svg>", "</g>")}</g>` +
    t(
      66,
      852,
      "ILLUSTRATIVE INTERFACE · NO LIVE HEALTH FEED",
      11,
      "#789084",
      'letter-spacing="2"',
    );
  return svg(b, 1440, 900, "#eef3ed");
}
function finflowCapture() {
  const bytes = fs
    .readFileSync(`${out}/finflow-capture.jpeg`)
    .toString("base64");
  return `<svg x="0" y="0" width="390" height="844" viewBox="0 0 390 844"><defs><clipPath id="finflow-screen"><rect width="390" height="844" rx="28"/></clipPath></defs><g clip-path="url(#finflow-screen)"><image href="data:image/jpeg;base64,${bytes}" x="0" y="-878" width="390" height="2600"/></g></svg>`;
}
function desktopFinflow() {
  let b =
    t(66, 84, "FinFlow", 36, "#e6efef", 'font-weight="bold"') +
    t(
      66,
      125,
      "AI CRYPTO SENTINEL / FLUTTER MOBILE PRODUCT",
      12,
      "#7a9aa7",
      'letter-spacing="3"',
    ) +
    t(66, 279, "Your market.", 66, "#e6efef") +
    t(66, 362, "In your pocket.", 66, "#e6efef") +
    t(66, 444, "Personal tracking meets contextual AI.", 22, "#8caab4") +
    r(66, 526, 490, 118, "#17272f", 20) +
    t(92, 566, "MOBILE BY DESIGN", 12, "#7a9aa7", 'letter-spacing="2"') +
    t(92, 610, "Flutter / Riverpod / Gemini AI", 24, "#d6e9e9") +
    t(
      66,
      852,
      "PRODUCT PRESENTATION · HISTORICAL APP CAPTURE",
      11,
      "#7a9aa7",
      'letter-spacing="2"',
    );
  b += `<g transform="translate(738 60) scale(.88)">${finflowCapture()}</g>`;
  return svg(b, 1440, 900, "#0e1a21");
}
let omni =
  t(54, 73, "Omnichannel", 31, "#d9e2ee", 'font-weight="bold"') +
  t(
    54,
    108,
    "META SUITE / AGENTIC PATIENT OPERATIONS",
    11,
    "#8798b1",
    'letter-spacing="2"',
  ) +
  r(40, 155, 268, 690, "#17202e", 18) +
  t(65, 200, "Connected channels", 18, "#d9e2ee");
["WhatsApp", "Instagram", "Messenger"].forEach((s, i) => {
  omni +=
    r(61, 225 + i * 73, 226, 55, i === 0 ? "#29394a" : "#1c2939", 10) +
    t(82, 259 + i * 73, s, 16, "#a9bad0");
});
omni +=
  t(65, 663, "One shared context", 15, "#a9bad0") +
  t(65, 699, "Patient conversations", 13, "#8798b1") +
  t(65, 724, "Appointment availability", 13, "#8798b1") +
  t(65, 749, "Database records", 13, "#8798b1") +
  r(332, 155, 590, 690, "#f1f3f4", 18) +
  t(359, 200, "Patient conversation", 22, "#37495b") +
  t(359, 230, "ILLUSTRATIVE WORKSPACE", 10, "#8b9ba5", 'letter-spacing="2"') +
  r(435, 277, 459, 88, "#dce6e7", 16) +
  t(455, 312, "Can I book a visit tomorrow?", 20, "#37495b") +
  t(455, 341, "New message / WhatsApp", 11, "#7c919a") +
  r(358, 393, 485, 143, "#ffffff", 16) +
  t(380, 430, "AI Agent", 13, "#76929c", 'font-weight="bold"') +
  t(380, 465, "I can help with that. Let me check", 19, "#37495b") +
  t(380, 497, "the next available appointment.", 19, "#37495b") +
  r(358, 567, 535, 113, "#e3ece8", 14) +
  t(380, 607, "Availability checked", 18, "#45675b") +
  t(380, 640, "10:30   /   11:00   /   14:00", 18, "#45675b") +
  r(946, 155, 455, 690, "#17202e", 18) +
  t(973, 200, "Appointment orchestration", 20, "#d9e2ee");
[
  "01  Understand intent",
  "02  Retrieve availability",
  "03  Reserve the slot",
  "04  Write appointment",
  "05  Confirm with patient",
].forEach((s, i) => {
  omni +=
    r(969, 235 + i * 92, 407, 68, "#1c2939", 12) +
    t(990, 276 + i * 92, s, 18, "#a9bad0");
});
omni += t(
  54,
  881,
  "ILLUSTRATIVE WORKFLOW · NO PATIENT DATA OR CLINIC CONNECTION",
  10,
  "#8798b1",
  'letter-spacing="2"',
);
fs.writeFileSync(`${out}/foreseeme.svg`, desktopHealth());
fs.writeFileSync(`${out}/finflow.svg`, desktopFinflow());
fs.writeFileSync(`${out}/omnichannel.svg`, svg(omni, 1440, 900, "#101926"));
console.log(
  "Generated original ForeSeeMe, Meta Suite and FinFlow desktop/phone interfaces.",
);
