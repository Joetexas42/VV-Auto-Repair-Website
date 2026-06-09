/**
 * Smoke test: Dallas Google Maps URL
 *
 * Verifies that:
 *   1. The website's shared constants file (src/lib/locations.ts) does NOT
 *      contain any hardcoded Dallas map URL — or the file no longer exists
 *      (static HTML site has no shared constants layer).
 *   2. The API route (artifacts/api-server/src/routes/locationConfig.ts) has
 *      no hardcoded Dallas URL and reads the env var.
 *   3. Static website pages (contact.html, index.html) contain the correct
 *      Dallas directions URL on the Get Directions button.
 *   4. The mobile app data constants (data.ts) do NOT hardcode mapUrl fields
 *      (URLs are now served exclusively by the API).
 *   5. The DALLAS_MAPS_URL env var is set to the correct URL.
 *
 * Run with:  node tests/dallas-maps-url.test.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const EXPECTED_DALLAS_URL = "https://maps.app.goo.gl/iuW6oo7aA3FH7eG4A?g_st=ic";
const OLD_COORDS = "@32.8488156,-96.6827611";
const OLD_PLACE_ID = "0x864ea12237496ed3";
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

function extractOldLongFormDallasUrls(content) {
  const urlRegex = /https:\/\/www\.google\.com\/maps\/[^\s"'>]+/g;
  return (content.match(urlRegex) ?? []).filter(
    (u) => u.includes(OLD_COORDS) || u.includes(OLD_PLACE_ID)
  );
}

// ── 1. Website shared constants — URLs must have been removed (or file gone) ──
console.log(
  "\n─── Website – shared constants (artifacts/vv-auto-website/src/lib/locations.ts)"
);
{
  const content = readFile("artifacts/vv-auto-website/src/lib/locations.ts", { optional: true });
  if (content) {
    const dallasUrls = extractOldLongFormDallasUrls(content);
    assert(
      dallasUrls.length === 0,
      `No hardcoded Dallas maps URL in locations.ts (URLs are served by the API) (got ${dallasUrls.length})`
    );
  } else {
    console.log("  ✓  locations.ts removed — no hardcoded Dallas URL possible");
    passed++;
  }
}

// ── 2. API server route has no hardcoded Dallas URL (served via env/DB only) ───
console.log(
  "\n─── API server – location config route (artifacts/api-server/src/routes/locationConfig.ts)"
);
{
  const content = readFile("artifacts/api-server/src/routes/locationConfig.ts");
  if (content) {
    const dallasUrls = extractOldLongFormDallasUrls(content);
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

// ── 3. Static website HTML pages contain the correct Dallas directions URL ────
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

  assert(
    content.includes(EXPECTED_DALLAS_URL),
    `Page contains the correct Dallas directions URL (${EXPECTED_DALLAS_URL})`
  );
  assert(
    !FORBIDDEN_PATTERN.test(content.match(/href="[^"]*dallas[^"]*"/i)?.[0] ?? ""),
    `Dallas directions link does not use the coordinate-only ?q= format`
  );
}

// ── 4. Mobile app data constants — mapUrl field must have been removed ────────
console.log(
  "\n─── Mobile app – data constants (artifacts/vv-auto-mobile/constants/data.ts)"
);
{
  const content = readFile("artifacts/vv-auto-mobile/constants/data.ts");
  if (content) {
    const dallasUrls = extractOldLongFormDallasUrls(content);
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

// ── 5. Env var DALLAS_MAPS_URL must be set to the correct URL ─────────────────
console.log(
  "\n─── Env var – DALLAS_MAPS_URL (must equal the owner-provided directions URL)"
);
{
  const dallasEnvUrl = process.env["DALLAS_MAPS_URL"] ?? null;
  if (dallasEnvUrl === null) {
    console.warn(
      "  ⚠  DALLAS_MAPS_URL is not set in the environment — skipping content checks"
    );
  } else {
    assert(
      dallasEnvUrl === EXPECTED_DALLAS_URL,
      `DALLAS_MAPS_URL equals the correct owner-provided URL`
    );
    assert(
      !FORBIDDEN_PATTERN.test(dallasEnvUrl),
      "DALLAS_MAPS_URL does not use the coordinate-only ?q= format that shows 'invalid coord'"
    );
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
