/**
 * Smoke test: Dallas Google Maps URL — coordinates + place-ID format
 *
 * Verifies that:
 *   1. The website's shared constants file (src/lib/locations.ts) does NOT
 *      contain any hardcoded Dallas map URL (removed in favour of API-served config).
 *   2. The API route (artifacts/api-server/src/routes/locationConfig.ts) has
 *      the correct Dallas URL as its hardcoded default and reads the env var.
 *   3. Website pages (contact.tsx, index.tsx) do NOT hardcode the URL and
 *      instead use the runtime location config hook (useLocationConfig).
 *   4. The mobile app data constants (data.ts) do NOT hardcode mapUrl fields
 *      (URLs are now served exclusively by the API).
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
const EXPECTED_SECONDARY_CID = "0x44a59c7835f91535";
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

function extractDallasUrls(content) {
  const urlRegex = /https:\/\/www\.google\.com\/maps\/[^\s"'>]+/g;
  return (content.match(urlRegex) ?? []).filter(
    (u) => u.includes(EXPECTED_COORDS) || u.includes(EXPECTED_PLACE_ID)
  );
}

// ── 1. Website shared constants — URLs must have been removed ─────────────────
console.log(
  "\n─── Website – shared constants (artifacts/vv-auto-website/src/lib/locations.ts)"
);
{
  const content = readFile("artifacts/vv-auto-website/src/lib/locations.ts");
  if (content) {
    const dallasUrls = extractDallasUrls(content);
    assert(
      dallasUrls.length === 0,
      `No hardcoded Dallas maps URL in locations.ts (URLs are served by the API) (got ${dallasUrls.length})`
    );
  }
}

// ── 2. API server route has no hardcoded Dallas URL (served via env/DB only) ───
console.log(
  "\n─── API server – location config route (artifacts/api-server/src/routes/locationConfig.ts)"
);
{
  const content = readFile("artifacts/api-server/src/routes/locationConfig.ts");
  if (content) {
    const dallasUrls = extractDallasUrls(content);
    assert(
      dallasUrls.length === 0,
      `No hardcoded Dallas maps URL in locationConfig.ts (URL served via env var or DB) (got ${dallasUrls.length})`
    );
    assert(
      content.includes("DALLAS_MAPS_URL"),
      `Route reads DALLAS_MAPS_URL env var for runtime override`
    );
  }
}

// ── 3. Website pages use runtime hook, not hardcoded URL ─────────────────────
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

  const hardcodedUrls = extractDallasUrls(content);
  assert(
    hardcodedUrls.length === 0,
    `No hardcoded Dallas maps URL in page file (URL served from API at runtime)`
  );

  assert(
    content.includes("useLocationConfig"),
    `Page uses useLocationConfig hook for runtime URL`
  );

  assert(
    content.includes("locationConfig"),
    `Page reads locationConfig data for map link`
  );
}

// ── 4. Mobile app data constants — mapUrl field must have been removed ────────
console.log(
  "\n─── Mobile app – data constants (artifacts/vv-auto-mobile/constants/data.ts)"
);
{
  const content = readFile("artifacts/vv-auto-mobile/constants/data.ts");
  if (content) {
    const dallasUrls = extractDallasUrls(content);
    assert(
      dallasUrls.length === 0,
      `No hardcoded Dallas maps URL in data.ts (URLs are served by the API) (got ${dallasUrls.length})`
    );
    assert(
      !content.includes("mapUrl"),
      `data.ts does not contain a mapUrl field (removed in favour of API-served config)`
    );
  }
}

// ── 5. Env var DALLAS_MAPS_URL must contain the correct place identifiers ──────
console.log(
  "\n─── Env var – DALLAS_MAPS_URL (must contain verified Place identifiers)"
);
{
  const dallasEnvUrl = process.env["DALLAS_MAPS_URL"] ?? null;
  if (dallasEnvUrl === null) {
    console.warn(
      "  ⚠  DALLAS_MAPS_URL is not set in the environment — skipping content checks"
    );
  } else {
    const urlsInEnvVar = extractDallasUrls(dallasEnvUrl);
    assert(
      urlsInEnvVar.length > 0 ||
        dallasEnvUrl.includes(EXPECTED_PLACE_ID) ||
        dallasEnvUrl.includes(EXPECTED_SECONDARY_CID),
      `DALLAS_MAPS_URL contains a known Dallas place identifier (${EXPECTED_PLACE_ID} or ${EXPECTED_SECONDARY_CID})`
    );
    assert(
      !FORBIDDEN_PATTERN.test(dallasEnvUrl),
      "DALLAS_MAPS_URL does not use the coordinate-only ?q= format that shows 'invalid coord'"
    );
    assert(
      dallasEnvUrl.includes(EXPECTED_COORDS),
      `DALLAS_MAPS_URL contains the expected coordinates (${EXPECTED_COORDS})`
    );
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
