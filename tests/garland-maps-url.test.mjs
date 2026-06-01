/**
 * Smoke test: Garland Google Maps URL — coordinates + place-feature-ID format
 *
 * Verifies that:
 *   1. The canonical Garland "Get Directions" URL in the website's shared
 *      constants file (src/lib/locations.ts) uses the coordinate-based URL
 *      format (@lat,lng) — not a plain ?q= text query — and contains the
 *      correct coordinates and place feature-ID.
 *   2. Website pages (contact.tsx, index.tsx) import GARLAND_MAPS_URL from
 *      that shared file instead of hardcoding the URL themselves.
 *   3. The mobile app data constants still contain the correct Garland URL.
 *
 * Run with:  node tests/garland-maps-url.test.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const EXPECTED_COORDS = "@32.9016826,-96.6874462";
const EXPECTED_FEATURE_ID = "11pzygbgln";
const FORBIDDEN_PATTERN = /\?q=/;

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

function readFile(relPath) {
  try {
    return readFileSync(resolve(root, relPath), "utf8");
  } catch (err) {
    console.error(`  ✗  Could not read file: ${err.message}`);
    failed++;
    return null;
  }
}

function extractGarlandUrls(content) {
  const urlRegex = /https:\/\/www\.google\.com\/maps\/[^\s"'>]+/g;
  return (content.match(urlRegex) ?? []).filter(
    (u) => u.includes(EXPECTED_COORDS) || u.includes(EXPECTED_FEATURE_ID)
  );
}

// ── 1. Canonical source of truth: website shared constants file ───────────────
console.log(
  "\n─── Website – shared constants (artifacts/vv-auto-website/src/lib/locations.ts)"
);
{
  const content = readFile("artifacts/vv-auto-website/src/lib/locations.ts");
  if (content) {
    const garlandUrls = extractGarlandUrls(content);
    assert(
      garlandUrls.length >= 1,
      `At least 1 Garland maps URL found in locations.ts (got ${garlandUrls.length})`
    );
    for (const url of garlandUrls) {
      assert(
        url.includes(EXPECTED_COORDS),
        `URL contains correct coordinates (${EXPECTED_COORDS}): ${url.slice(0, 80)}…`
      );
      assert(
        url.includes(EXPECTED_FEATURE_ID),
        `URL contains place feature-ID (${EXPECTED_FEATURE_ID}): ${url.slice(0, 80)}…`
      );
      assert(
        !FORBIDDEN_PATTERN.test(url),
        `URL does NOT use plain ?q= text-query format`
      );
    }
  }
}

// ── 2. Website pages import from the shared file, not hardcode the URL ────────
const PAGE_SOURCES = [
  {
    label: "Website – contact page (artifacts/vv-auto-website/src/pages/contact.tsx)",
    file: "artifacts/vv-auto-website/src/pages/contact.tsx",
  },
  {
    label: "Website – homepage (artifacts/vv-auto-website/src/pages/index.tsx)",
    file: "artifacts/vv-auto-website/src/pages/index.tsx",
  },
];

for (const source of PAGE_SOURCES) {
  console.log(`\n─── ${source.label}`);
  const content = readFile(source.file);
  if (!content) continue;

  const hardcodedUrls = extractGarlandUrls(content);
  assert(
    hardcodedUrls.length === 0,
    `No hardcoded Garland maps URL in page file (URL lives in shared locations.ts)`
  );

  assert(
    content.includes("GARLAND_MAPS_URL"),
    `Page references GARLAND_MAPS_URL constant from locations.ts`
  );

  assert(
    content.includes("@/lib/locations") || content.includes("lib/locations"),
    `Page imports from @/lib/locations`
  );
}

// ── 3. Mobile app data constants ──────────────────────────────────────────────
console.log(
  "\n─── Mobile app – data constants (artifacts/vv-auto-mobile/constants/data.ts)"
);
{
  const content = readFile("artifacts/vv-auto-mobile/constants/data.ts");
  if (content) {
    const garlandUrls = extractGarlandUrls(content);
    assert(
      garlandUrls.length >= 1,
      `At least 1 Garland maps URL(s) found (got ${garlandUrls.length})`
    );
    for (const url of garlandUrls) {
      assert(
        url.includes(EXPECTED_COORDS),
        `URL contains correct coordinates (${EXPECTED_COORDS}): ${url.slice(0, 80)}…`
      );
      assert(
        url.includes(EXPECTED_FEATURE_ID),
        `URL contains place feature-ID (${EXPECTED_FEATURE_ID}): ${url.slice(0, 80)}…`
      );
      assert(
        !FORBIDDEN_PATTERN.test(url),
        `URL does NOT use plain ?q= text-query format`
      );
    }
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
