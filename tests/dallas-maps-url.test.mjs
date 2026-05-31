/**
 * Smoke test: Dallas Google Maps URL — coordinates + place-ID format
 *
 * Verifies that every hardcoded Dallas "Get Directions" href in the codebase:
 *   1. Uses the coordinate-based URL format (@lat,lng) — not a plain ?q= text query
 *   2. Contains the correct coordinates for 11366 Jupiter Rd, Dallas TX
 *   3. Contains the correct Google place ID (0x864ea12237496ed3)
 *
 * Run with:  node tests/dallas-maps-url.test.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const EXPECTED_COORDS = "@32.8488156,-96.6827611";
const EXPECTED_PLACE_ID = "0x864ea12237496ed3";
const FORBIDDEN_PATTERN = /\?q=/;

const SOURCES = [
  {
    label: "Website – contact page (artifacts/vv-auto-website/src/pages/contact.tsx)",
    file: "artifacts/vv-auto-website/src/pages/contact.tsx",
    expectedOccurrences: 1,
  },
  {
    label: "Website – homepage (artifacts/vv-auto-website/src/pages/index.tsx)",
    file: "artifacts/vv-auto-website/src/pages/index.tsx",
    expectedOccurrences: 1,
  },
  {
    label: "Mobile app – data constants (artifacts/vv-auto-mobile/constants/data.ts)",
    file: "artifacts/vv-auto-mobile/constants/data.ts",
    expectedOccurrences: 1,
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
    failed++;
    continue;
  }

  const urlRegex = /https:\/\/www\.google\.com\/maps\/[^\s"'>]+/g;
  const dallasUrls = (content.match(urlRegex) ?? []).filter(
    (u) => u.includes(EXPECTED_COORDS) || u.includes(EXPECTED_PLACE_ID)
  );

  assert(
    dallasUrls.length >= source.expectedOccurrences,
    `At least ${source.expectedOccurrences} Dallas maps URL(s) found (got ${dallasUrls.length})`
  );

  for (const url of dallasUrls) {
    assert(
      url.includes(EXPECTED_COORDS),
      `URL contains correct coordinates (${EXPECTED_COORDS}): ${url.slice(0, 80)}…`
    );
    assert(
      url.includes(EXPECTED_PLACE_ID),
      `URL contains place ID (${EXPECTED_PLACE_ID}): ${url.slice(0, 80)}…`
    );
    assert(
      !FORBIDDEN_PATTERN.test(url),
      `URL does NOT use plain ?q= text-query format`
    );
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
