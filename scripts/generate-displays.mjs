import fs from "node:fs";

// Original vector interfaces. Sample figures are illustrative, never live data.
fs.mkdirSync("public/displays", { recursive: true });
const text = (x, y, t, size = 16, color = "#6d747d", extra = "") =>
  `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${extra}>${t}</text>`;
const rect = (x, y, w, h, c, r = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
const line = (x, y, x2, y2, c = "#e6e8ec") =>
  `<path d="M${x} ${y}H${x2}" stroke="${c}"/>`.replace(
    `H${x2}`,
    `L${x2} ${y2}`,
  );
const house = (x, y, w, h) =>
  `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 420 230"><defs><linearGradient id="sky"><stop stop-color="#9bafb0"/><stop offset="1" stop-color="#dbe1da"/></linearGradient></defs><path fill="url(#sky)" d="M0 0H420V230H0z"/><circle cx="330" cy="44" r="30" fill="#ebead6"/><path d="M0 180L100 150 270 162 420 150V230H0" fill="#84917d"/><path d="M63 79L263 58 350 95 149 117Z" fill="#dfd8c4"/><path d="M63 79V181L149 209V117Z" fill="#a2a596"/><path d="M149 117L350 95V179L149 209Z" fill="#e6e1d2"/><path d="M176 129L322 113V166L176 187Z" fill="#34464a"/><path d="M202 126V182M246 121V176M291 116V170" stroke="#b6b7a9" stroke-width="4"/><path d="M82 103L127 117V168L82 156Z" fill="#3e4e4e"/><path d="M35 199L175 225 381 188 248 170" fill="#c2bca9"/><path d="M0 215L88 195M322 230L420 188" stroke="#647866" stroke-width="8"/><path d="M358 176V75M358 119L337 91M358 133L384 98" stroke="#566854" stroke-width="7"/></svg>`;
const wrap = (body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900"><rect width="1440" height="900" fill="${bg}"/><g font-family="Arial,sans-serif">${body}</g></svg>`;
function chrome(brand, active, dark = false) {
  const fg = dark ? "#cbd3da" : "#333e42";
  return (
    rect(0, 0, 220, 900, dark ? "#141b20" : "#f1f2ed") +
    text(28, 53, brand, 22, fg, 'font-weight="bold"') +
    text(28, 95, "WORKSPACE / DEMO", 10, "#85918e", 'letter-spacing="2"') +
    ["Overview", "Properties", "Analytics", "Activity", "Settings"]
      .map(
        (t, i) =>
          rect(
            17,
            132 + i * 56,
            185,
            42,
            i === active ? (dark ? "#26343d" : "#dfe5db") : "transparent",
            5,
          ) + text(36, 159 + i * 56, t, 14, fg),
      )
      .join("") +
    text(28, 845, "HZ / ENGINEERING", 11, "#85918e") +
    rect(220, 0, 1220, 72, dark ? "#11191e" : "#ffffff") +
    text(
      256,
      44,
      "Workspace   /   " + ["Overview", "Properties", "Analytics"][active],
      14,
      fg,
    ) +
    text(1180, 44, "ILLUSTRATIVE DATA", 11, "#85918e")
  );
}
let b =
  chrome("ROYAL ENCLAVE", 1) +
  text(
    262,
    131,
    "REAL ESTATE / BIDDING PLATFORM",
    11,
    "#75856b",
    'letter-spacing="2"',
  ) +
  text(262, 182, "Find your next address.", 34, "#263b31") +
  text(262, 215, "Property discovery. Informed decisions.", 15) +
  rect(262, 245, 1130, 56, "#fff", 7) +
  text(285, 279, "Search by location or property", 15) +
  rect(1230, 254, 150, 38, "#344d3c", 5) +
  text(1260, 279, "Explore  →", 14, "#fff");
for (let i = 0; i < 3; i++) {
  let x = 262 + i * 382;
  b +=
    rect(x, 331, 358, 348, "#fff", 8) +
    house(x, 331, 358, 197) +
    text(
      x + 18,
      559,
      [
        "The courtyard residence",
        "A quieter kind of living",
        "Space to call your own",
      ][i],
      18,
      "#293b31",
    ) +
    text(
      x + 18,
      588,
      [
        "Lahore · Residential",
        "Islamabad · Residential",
        "Lahore · New listing",
      ][i],
      12,
    ) +
    line(x + 18, 608, x + 340, 608) +
    text(x + 18, 638, "BIDDING PREVIEW", 10) +
    text(x + 211, 640, "View property ↗", 12, "#496348");
}
b +=
  text(262, 732, "Market overview", 22, "#263b31") +
  rect(262, 756, 550, 99, "#e5ebe0", 7) +
  text(283, 790, "Property activity", 13) +
  `<path d="M284 833L330 824 370 829 420 800 460 816 510 796 550 811 600 786 650 797 710 776 790 782" fill="none" stroke="#6b8464" stroke-width="3"/>` +
  rect(838, 756, 554, 99, "#fff", 7) +
  text(860, 792, "Discover · Evaluate · Place a bid", 20, "#344d3c") +
  text(
    860,
    825,
    "Concept interface based on the existing project description",
    12,
  );
fs.writeFileSync("public/displays/royal.svg", wrap(b, "#f7f8f4"));
b =
  chrome("ESTIMATE / AI", 2) +
  text(262, 132, "PROPERTY INTELLIGENCE", 11, "#6586a3", 'letter-spacing="2"') +
  text(262, 182, "A clearer view of value.", 34, "#233446") +
  text(262, 214, "Valuation workspace / model output preview", 15) +
  rect(262, 251, 351, 268, "#fff", 8) +
  text(284, 286, "Property information", 17, "#233446");
[
  "Location / Lahore",
  "Area / 2,400 sq ft",
  "Bedrooms / 4",
  "Property type / Residential",
].forEach((t, i) => {
  b +=
    line(284, 317 + i * 41, 591, 317 + i * 41) + text(284, 341 + i * 41, t, 14);
});
b +=
  rect(638, 251, 754, 268, "#e5edf5", 8) +
  text(
    666,
    287,
    "ILLUSTRATIVE VALUATION",
    11,
    "#6586a3",
    'letter-spacing="2"',
  ) +
  text(666, 355, "PKR 42.8m", 52, "#294766") +
  text(666, 392, "Sample estimate · not a real prediction", 14) +
  text(
    666,
    469,
    "Historical data → Feature engineering → Inference",
    15,
    "#3f617e",
  ) +
  rect(262, 543, 697, 309, "#fff", 8) +
  text(286, 582, "Historical value / sample series", 18, "#233446");
for (let i = 0; i < 5; i++) b += line(286, 620 + i * 43, 930, 620 + i * 43);
b +=
  `<path d="M290 795L350 774 407 782 470 740 530 753 590 704 650 713 710 673 770 690 840 638 926 623V807H290Z" fill="#edf3f8"/><path d="M290 795L350 774 407 782 470 740 530 753 590 704 650 713 710 673 770 690 840 638 926 623" fill="none" stroke="#6087ab" stroke-width="4"/>` +
  rect(983, 543, 409, 309, "#fff", 8) +
  text(1008, 582, "Feature importance", 18, "#233446");
["Location", "Area", "Property age", "Bedrooms"].forEach((t, i) => {
  b +=
    text(1008, 627 + i * 51, t, 12) +
    rect(
      1008,
      638 + i * 51,
      350 - i * 68,
      10,
      ["#6087ab", "#84a2bd", "#a2b7cb", "#c1d0dd"][i],
      3,
    );
});
fs.writeFileSync("public/displays/estimation.svg", wrap(b, "#f2f5f9"));
fs.writeFileSync(
  "public/icon.svg",
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0b0d10"/><path d="M17 18v28m0-14h15m0-14v28m7-28h13L39 46h13" fill="none" stroke="#eeede8" stroke-width="4"/></svg>',
);
console.log("Generated original real-estate interfaces and identity icon.");
