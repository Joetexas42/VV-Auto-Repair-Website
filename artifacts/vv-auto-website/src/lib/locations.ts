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
