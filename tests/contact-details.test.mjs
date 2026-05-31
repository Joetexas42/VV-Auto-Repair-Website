/**
 * Smoke test: hardcoded contact details — phone numbers and email addresses
 *
 * Verifies that every phone number and email address for both locations
 * appears consistently in the website and mobile app source files.
 *
 * Dallas (Auto Repair, 11366 Jupiter Rd):
 *   - Main:  214-320-2171  →  tel:2143202171
 *   - Cell:  469-258-9356  →  tel:4692589356
 *   - Email: vv.autorepair@yahoo.com
 *
 * Garland (Body Shop, 3730 Marquis Dr):
 *   - Huong: 469-258-9356  →  tel:4692589356
 *   - David: 469-407-5340  →  tel:4694075340
 *   - Email: vv.autobodycorp@gmail.com
 *
 * Run with:  node tests/contact-details.test.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SOURCES = [
  {
    label: "Website – contact page (artifacts/vv-auto-website/src/pages/contact.tsx)",
    file: "artifacts/vv-auto-website/src/pages/contact.tsx",
  },
  {
    label: "Website – homepage (artifacts/vv-auto-website/src/pages/index.tsx)",
    file: "artifacts/vv-auto-website/src/pages/index.tsx",
  },
  {
    label: "Mobile app – data constants (artifacts/vv-auto-mobile/constants/data.ts)",
    file: "artifacts/vv-auto-mobile/constants/data.ts",
  },
];

const CHECKS = [
  {
    label: "Dallas main phone (2143202171 / 214-320-2171)",
    patterns: ["2143202171", "214-320-2171", "214.320.2171", "(214) 320-2171"],
  },
  {
    label: "Dallas/Garland shared cell phone (4692589356 / 469-258-9356)",
    patterns: ["4692589356", "469-258-9356", "469.258.9356", "(469) 258-9356"],
  },
  {
    label: "Garland David phone (4694075340 / 469-407-5340)",
    patterns: ["4694075340", "469-407-5340", "469.407.5340", "(469) 407-5340"],
  },
  {
    label: "Dallas email (vv.autorepair@yahoo.com)",
    patterns: ["vv.autorepair@yahoo.com"],
  },
  {
    label: "Garland email (vv.autobodycorp@gmail.com)",
    patterns: ["vv.autobodycorp@gmail.com"],
  },
];

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓  ${message}`);
    passed++;
  } else {
    console.error(`  ✗  ${message}`);
    failed++;
  }
}

for (const source of SOURCES) {
  console.log(`\n─── ${source.label}`);

  let content;
  try {
    content = readFileSync(resolve(root, source.file), "utf8");
  } catch (err) {
    console.error(`  ✗  Could not read file: ${err.message}`);
    failed += CHECKS.length;
    continue;
  }

  for (const check of CHECKS) {
    const found = check.patterns.some((p) => content.includes(p));
    assert(found, check.label);
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
