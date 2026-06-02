/**
 * Live check: both 'Get Directions' maps URLs resolve to a real business listing
 *
 * Verifies that:
 *   1. GET /api/location-config returns dallas.mapsUrl and garland.mapsUrl as
 *      non-null strings (i.e. the DB / env vars are populated).
 *   2. Each URL contains the known Google Maps place identifier for that location:
 *        Dallas  → 0x864ea12237496ed3
 *        Garland → /g/11pzygbgln
 *   3. An HTTP HEAD request to each URL returns a non-error (< 400) status,
 *      confirming the link is reachable and not a broken/invalid URL.
 *
 * The API base URL is read from the API_BASE_URL environment variable.
 * If that variable is not set the test is skipped with a clear warning.
 *
 * Run with:  node tests/maps-url-live.test.mjs
 */

const DALLAS_PLACE_ID  = "0x864ea12237496ed3";
const GARLAND_FEATURE  = "/g/11pzygbgln";

let passed = 0;
let failed = 0;
let skipped = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓  ${message}`);
    passed++;
  } else {
    console.error(`  ✗  ${message}`);
    failed++;
  }
}

async function headUrl(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    return { ok: res.status < 400, status: res.status };
  } catch (err) {
    return { ok: false, status: null, error: err.message };
  }
}

const apiBase = process.env["API_BASE_URL"];

if (!apiBase) {
  console.warn(
    "\n  ⚠  API_BASE_URL is not set — skipping live maps-URL check.\n" +
    "     Set API_BASE_URL to the running API server base URL (e.g. https://<your-domain>/api)\n" +
    "     and re-run to perform the live check.\n"
  );
  skipped++;
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed, ${skipped} skipped`);
  console.log("─".repeat(60));
  process.exit(0);
}

// ── 1. Fetch /location-config ─────────────────────────────────────────────────
console.log(`\n─── Live API check — ${apiBase}/location-config`);

let config;
try {
  const res = await fetch(`${apiBase}/location-config`, {
    signal: AbortSignal.timeout(10_000),
  });
  assert(res.ok, `GET /location-config returned HTTP ${res.status} (expected 2xx)`);
  config = await res.json();
} catch (err) {
  console.error(`  ✗  Could not reach ${apiBase}/location-config — ${err.message}`);
  failed++;
}

if (!config) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("─".repeat(60));
  process.exit(1);
}

// ── 2. Dallas mapsUrl ──────────────────────────────────────────────────────────
console.log("\n─── Dallas mapsUrl");
{
  const url = config?.dallas?.mapsUrl ?? null;
  assert(
    typeof url === "string" && url.length > 0,
    `dallas.mapsUrl is a non-empty string (got ${JSON.stringify(url)})`
  );
  if (typeof url === "string") {
    assert(
      url.includes(DALLAS_PLACE_ID),
      `dallas.mapsUrl contains the known place identifier (${DALLAS_PLACE_ID})`
    );
    console.log("  ↳  Checking reachability via HTTP HEAD …");
    const { ok, status, error } = await headUrl(url);
    assert(
      ok,
      `dallas.mapsUrl returns a non-error HTTP status (got ${status ?? error})`
    );
  }
}

// ── 3. Garland mapsUrl ─────────────────────────────────────────────────────────
console.log("\n─── Garland mapsUrl");
{
  const url = config?.garland?.mapsUrl ?? null;
  assert(
    typeof url === "string" && url.length > 0,
    `garland.mapsUrl is a non-empty string (got ${JSON.stringify(url)})`
  );
  if (typeof url === "string") {
    assert(
      url.includes(GARLAND_FEATURE),
      `garland.mapsUrl contains the known feature identifier (${GARLAND_FEATURE})`
    );
    console.log("  ↳  Checking reachability via HTTP HEAD …");
    const { ok, status, error } = await headUrl(url);
    assert(
      ok,
      `garland.mapsUrl returns a non-error HTTP status (got ${status ?? error})`
    );
  }
}

console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
