/**
 * Single source of truth for V.V. Auto Google Business URLs.
 *
 * Update these constants here and every page that links to Google Maps
 * or the review form will automatically stay in sync.
 *
 * Verified place IDs:
 *   Dallas  — ChIJaz5JNyKhToYRNRX5NXicpUQ  (V V Auto Repair, 11366 Jupiter Rd)
 *   Garland — /g/11pzygbgln                 (V V Auto Body Repair Corporation, 3730 Marquis Dr)
 */

export const DALLAS_MAPS_URL =
  "https://www.google.com/maps/place/V+V+Auto+Repair/@32.8488156,-96.6827611,17z/data=!4m8!3m7!1s0x864ea12237496ed3:0x44a59c7835f91535!8m2!3d32.8488156!4d-96.6827611!9m1!1b1";

export const GARLAND_MAPS_URL =
  "https://www.google.com/maps/place/V+V+Auto+Body+Repair+Corporation/@32.9016826,-96.6874462,17z/data=!3m1!4b1!4m6!3m5!1s/g/11pzygbgln!8m2!3d32.9016826!4d-96.6874462!16s%2Fg%2F11pzygbgln!9m1!1b1";

export const DALLAS_WRITE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ025JNyKhToYRNRX5NXicpUQ";

/**
 * Validates that the Dallas and Garland map URLs still contain the expected
 * coordinate and place-ID fragments. Call this once at app start in
 * development mode to catch accidental typos before they go live.
 *
 * Expected fragments:
 *   Dallas  — latitude 32.8488156, longitude -96.6827611
 *   Garland — place ID fragment 11pzygbgln, latitude 32.9016826
 */
export function validateLocationUrls(): void {
  const checks: Array<{ name: string; url: string; fragments: string[] }> = [
    {
      name: "DALLAS_MAPS_URL",
      url: DALLAS_MAPS_URL,
      fragments: ["32.8488156", "-96.6827611"],
    },
    {
      name: "GARLAND_MAPS_URL",
      url: GARLAND_MAPS_URL,
      fragments: ["11pzygbgln", "32.9016826"],
    },
  ];

  for (const { name, url, fragments } of checks) {
    for (const fragment of fragments) {
      if (!url.includes(fragment)) {
        console.warn(
          `[VV Auto] ${name} may be invalid — expected to find "${fragment}" in the URL.\n` +
            `  Current value: ${url}\n` +
            `  Check locations.ts and confirm the URL points to the correct place.`
        );
      }
    }
  }
}
