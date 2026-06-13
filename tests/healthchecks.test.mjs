/**
 * Smoke test: post-deploy healthcheck for both services
 *
 * Verifies that after a production deploy both services are reachable and
 * return a healthy response:
 *
 *   1. GET  <DEPLOY_URL>/api/healthz          → HTTP 200, body { status: "ok" }
 *   2. GET  <DEPLOY_URL>/vv-auto-mobile/      → HTTP 200
 *
 * The base URL is read from the DEPLOY_URL environment variable.
 * If that variable is not set the test exits with a clear warning (no failure).
 *
 * Run with:  node tests/healthchecks.test.mjs
 * Run with:  DEPLOY_URL=https://your-deployed-domain.repl.co node tests/healthchecks.test.mjs
 */

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

async function getUrl(url, { timeoutMs = 15_000 } = {}) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
    });
    let body = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: null, body: null, error: err.message };
  }
}

const deployUrl = process.env["DEPLOY_URL"];

if (!deployUrl) {
  console.warn(
    "\n  ⚠  DEPLOY_URL is not set — skipping post-deploy healthcheck.\n" +
    "     Set DEPLOY_URL to the deployed service base URL\n" +
    "     (e.g. https://<your-domain>.repl.co) and re-run to perform\n" +
    "     the live healthcheck.\n"
  );
  skipped++;
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed, ${skipped} skipped`);
  console.log("─".repeat(60));
  process.exit(0);
}

const base = deployUrl.replace(/\/$/, "");

// ── 1. API server healthcheck ──────────────────────────────────────────────────
console.log(`\n─── API healthcheck — ${base}/api/healthz`);
{
  const { ok, status, body, error } = await getUrl(`${base}/api/healthz`);

  assert(
    ok,
    `GET /api/healthz returned HTTP ${status ?? error} (expected 200)`
  );

  if (ok && body !== null) {
    assert(
      body?.status === "ok",
      `Response body has status "ok" (got ${JSON.stringify(body?.status)})`
    );
  }
}

// ── 2. Mobile app healthcheck ─────────────────────────────────────────────────
console.log(`\n─── Mobile app healthcheck — ${base}/vv-auto-mobile/`);
{
  const { ok, status, error } = await getUrl(`${base}/vv-auto-mobile/`);

  assert(
    ok,
    `GET /vv-auto-mobile/ returned HTTP ${status ?? error} (expected 200)`
  );
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(60));

if (failed > 0) {
  process.exit(1);
}
