/**
 * Seed the location_config table with verified Google Maps Place URLs for both
 * VV Auto locations.  Run this any time the database is cleared or the rows are
 * missing — it is idempotent (uses PATCH which upserts).
 *
 * Prerequisites:
 *   - API server must be running (pnpm --filter @workspace/api-server dev)
 *   - ADMIN_API_KEY must be set in the environment
 *
 * Usage:
 *   ADMIN_API_KEY=<key> node scripts/seed-location-config.mjs [--api-url http://localhost:8080]
 */

import { parseArgs } from "util";

const { values: args } = parseArgs({
  options: { "api-url": { type: "string", default: "http://localhost:8080" } },
  strict: false,
});

const BASE_URL = args["api-url"];
const ADMIN_KEY = process.env["ADMIN_API_KEY"];

if (!ADMIN_KEY) {
  console.error("Error: ADMIN_API_KEY environment variable is not set.");
  console.error("Set it before running:  ADMIN_API_KEY=<key> node scripts/seed-location-config.mjs");
  process.exit(1);
}

/**
 * Verified Google Maps Place URLs for each location.
 *
 * Dallas  — V V Auto Repair, 11366 Jupiter Rd, Dallas TX 75218
 *   Hex CID: 0x864ea12237496ed3  (location hash)
 *   The full place URL embeds both the location hash and the business CID
 *   so Google Maps opens the complete business card (ratings, hours, photos).
 *
 * Garland — V V Auto Body Repair, 3730 Marquis Dr, Garland TX 75042
 *   Feature ID: /g/11pzygbgln
 *   Encoded as %2Fg%2F11pzygbgln in the data parameter.
 */
const LOCATIONS = {
  dallas: {
    mapsUrl:
      "https://www.google.com/maps/place/V+V+Auto+Repair/@32.8488156,-96.6827611,17z/data=!4m8!3m7!1s0x864ea12237496ed3:0x44a59c7835f91535!8m2!3d32.8488156!4d-96.6827611!9m1!1b1",
  },
  garland: {
    mapsUrl:
      "https://www.google.com/maps/place/V+V+Auto+Body+Repair+Corporation/@32.9016826,-96.6874462,17z/data=!3m1!4b1!4m6!3m5!1s/g/11pzygbgln!8m2!3d32.9016826!4d-96.6874462!16s%2Fg%2F11pzygbgln!9m1!1b1",
  },
};

let passed = 0;
let failed = 0;

async function patch(locationId, payload) {
  const url = `${BASE_URL}/api/location-config/${locationId}`;
  const resp = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-api-key": ADMIN_KEY,
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`PATCH ${url} → HTTP ${resp.status}: ${body}`);
  }
  return resp.json();
}

for (const [locationId, payload] of Object.entries(LOCATIONS)) {
  try {
    const row = await patch(locationId, payload);
    console.log(`✓  ${locationId}: mapsUrl saved → ${row.mapsUrl?.slice(0, 80)}…`);
    passed++;
  } catch (err) {
    console.error(`✗  ${locationId}: ${err.message}`);
    failed++;
  }
}

console.log(`\nDone: ${passed} succeeded, ${failed} failed`);
if (failed > 0) process.exit(1);
