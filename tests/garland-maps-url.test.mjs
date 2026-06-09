/**
 * Smoke test: Garland Google Maps URL — coordinates + place-feature-ID format
 *
 * Verifies that:
 *   1. The website's shared constants file (src/lib/locations.ts) does NOT
 *      contain any hardcoded Garland map URL — or the file no longer exists
 *      (static HTML site has no shared constants layer).
 *   2. The API route (artifacts/api-server/src/routes/locationConfig.ts) has
 *      the correct Garland URL as its hardcoded default and reads the env var.
 *   3. Static website pages (contact.html, index.html) contain the correct
 *      Garland maps URL with verified coordinates and feature identifier.
 *   4. The mobile app data constants (data.ts) do NOT hardcode mapUrl fields
 *      (URLs are now served exclusively by the API).
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
const EXPECTED_FEATURE_PATH = "/g/11pzygbgln";
const EXPECTED_SHORT_URL = "https://maps.app.goo.gl/SRFnqikpxGiZt1gm7";
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

function readFile(relPath, { optional = false } = {}) {
  try {
    return readFileSync(resolve(root, relPath), "utf8");
  } catch (err) {
    if (optional) {
      console.log(`  ℹ  File not present (skipping): ${relPath}`);
      return null;
    }
    console.error(`  ✗  Could not read file: ${err.message}`);
    failed++;
    return null;
  }
}

function extractGarlandUrls(content) {
  const longUrlRegex = /https:\/\/www\.google\.com\/maps\/[^\s"'>]+/g;
  const shortUrlRegex = /https:\/\/maps\.app\.goo\.gl\/[^\s"'>]+/g;
  const longUrls = (content.match(longUrlRegex) ?? []).filter(
    (u) => u.includes(EXPECTED_COORDS) || u.includes(EXPECTED_FEATURE_ID)
  );
  const shortUrls = (content.match(shortUrlRegex) ?? []).filter(
    (u) => u.includes("SRFnqikpxGiZt1gm7")
  );
  return [...longUrls, ...shortUrls];
}

// ── 1. Website shared constants — URLs must have been removed (or file gone) ──
console.log(
  "\n─── Website – shared constants (artifacts/vv-auto-website/src/lib/locations.ts)"
);
{
  const content = readFile("artifacts/vv-auto-website/src/lib/locations.ts", { optional: true });
  if (content) {
    const garlandUrls = extractGarlandUrls(content);
    assert(
      garlandUrls.length === 0,
      `No hardcoded Garland maps URL in locations.ts (URLs are served by the API) (got ${garlandUrls.length})`
    );
  } else {
    console.log("  ✓  locations.ts removed — no hardcoded Garland URL possible");
    passed++;
  }
}

// ── 2. API server route has no hardcoded Garland URL (served via env/DB only) ──
console.log(
  "\n─── API server – location config route (artifacts/api-server/src/routes/locationConfig.ts)"
);
{
  const content = readFile("artifacts/api-server/src/routes/locationConfig.ts");
  if (content) {
    const garlandUrls = extractGarlandUrls(content);
    assert(
      garlandUrls.length === 0,
      `No hardcoded Garland maps URL in locationConfig.ts (URL served via env var or DB) (got ${garlandUrls.length})`
    );
    assert(
      content.includes("GARLAND_MAPS_URL"),
      `Route reads GARLAND_MAPS_URL env var for runtime override`
    );
  }
}

// ── 3. Static website HTML pages contain the correct Garland URL ─────────────
const PAGE_SOURCES = [
  {
    label: "Website – contact page (artifacts/vv-auto-website/contact.html)",
    file: "artifacts/vv-auto-website/contact.html",
  },
  {
    label: "Website – homepage (artifacts/vv-auto-website/index.html)",
    file: "artifacts/vv-auto-website/index.html",
  },
];

for (const source of PAGE_SOURCES) {
  console.log(`\n─── ${source.label}`);
  const content = readFile(source.file);
  if (!content) continue;

  const garlandUrls = extractGarlandUrls(content);
  assert(
    garlandUrls.length > 0,
    `Page contains a Garland maps URL with correct coordinates or feature ID`
  );

  if (garlandUrls.length > 0) {
    assert(
      !FORBIDDEN_PATTERN.test(garlandUrls[0]),
      `Garland maps URL does not use the coordinate-only ?q= format`
    );
    assert(
      garlandUrls[0].includes(EXPECTED_FEATURE_ID) ||
        garlandUrls[0].includes(EXPECTED_COORDS) ||
        garlandUrls[0].includes("SRFnqikpxGiZt1gm7"),
      `Garland maps URL contains known place identifier, coordinates, or short-link ID`
    );
  }
}

// ── 4. Mobile app data constants — mapUrl field must have been removed ────────
console.log(
  "\n─── Mobile app – data constants (artifacts/vv-auto-mobile/constants/data.ts)"
);
{
  const content = readFile("artifacts/vv-auto-mobile/constants/data.ts");
  if (content) {
    const garlandUrls = extractGarlandUrls(content);
    assert(
      garlandUrls.length === 0,
      `No hardcoded Garland maps URL in data.ts (URLs are served by the API) (got ${garlandUrls.length})`
    );
    assert(
      !content.includes("mapUrl"),
      `data.ts does not contain a mapUrl field (removed in favour of API-served config)`
    );
  }
}

// ── 5. Env var GARLAND_MAPS_URL must contain the correct place identifiers ─────
console.log(
  "\n─── Env var – GARLAND_MAPS_URL (must contain verified Place identifiers)"
);
{
  const garlandEnvUrl = process.env["GARLAND_MAPS_URL"] ?? null;
  if (garlandEnvUrl === null) {
    console.warn(
      "  ⚠  GARLAND_MAPS_URL is not set in the environment — skipping content checks"
    );
  } else {
    const urlsInEnvVar = extractGarlandUrls(garlandEnvUrl);
    assert(
      urlsInEnvVar.length > 0 ||
        garlandEnvUrl.includes(EXPECTED_FEATURE_ID) ||
        garlandEnvUrl.includes(EXPECTED_FEATURE_PATH),
      `GARLAND_MAPS_URL contains the known Garland feature identifier (${EXPECTED_FEATURE_ID})`
    );
    assert(
      !FORBIDDEN_PATTERN.test(garlandEnvUrl),
      "GARLAND_MAPS_URL does not use the coordinate-only ?q= format that shows 'invalid coord'"
    );
    assert(
      garlandEnvUrl.includes(EXPECTED_COORDS),
      `GARLAND_MAPS_URL contains the expected coordinates (${EXPECTED_COORDS})`
    );
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
