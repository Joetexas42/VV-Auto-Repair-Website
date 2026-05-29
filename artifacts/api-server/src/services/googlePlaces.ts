import { logger } from "../lib/logger";

export interface PlaceReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description?: string;
  profile_photo_url?: string;
}

export interface PlaceData {
  rating?: number;
  user_ratings_total?: number;
  reviews?: PlaceReview[];
}

interface CacheEntry {
  placeId: string | null;
  data: PlaceData | null;
  cachedAt: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000;

const cache: Map<string, CacheEntry> = new Map();

const PLACE_QUERIES: Record<string, string> = {
  dallas: "V V Auto Repair 11366 Jupiter Rd Dallas TX 75218",
  garland: "V V Auto Body 3730 Marquis Dr Garland TX 75042",
};

async function searchPlaceNew(query: string, apiKey: string): Promise<{ placeId: string; data: PlaceData } | null> {
  const url = "https://places.googleapis.com/v1/places:searchText";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.rating,places.userRatingCount,places.reviews,places.reviews.authorAttribution",
    },
    body: JSON.stringify({ textQuery: query }),
  });

  if (!res.ok) return null;

  const body = (await res.json()) as {
    places?: Array<{
      id: string;
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
        publishTime?: string;
      }>;
    }>;
  };

  if (!body.places || body.places.length === 0) return null;

  const place = body.places[0];
  const reviews: PlaceReview[] = (place.reviews ?? [])
    .filter((r) => r.text?.text)
    .map((r) => ({
      author_name: r.authorAttribution?.displayName ?? "Google Customer",
      rating: r.rating ?? 5,
      text: r.text?.text ?? "",
      time: r.publishTime ? Math.floor(new Date(r.publishTime).getTime() / 1000) : Date.now() / 1000,
      relative_time_description: r.relativePublishTimeDescription,
      profile_photo_url: r.authorAttribution?.photoUri,
    }));

  return {
    placeId: place.id,
    data: {
      rating: place.rating,
      user_ratings_total: place.userRatingCount,
      reviews,
    },
  };
}

async function searchPlaceLegacy(query: string, apiKey: string): Promise<string | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", query);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) return null;

  const body = (await res.json()) as {
    status: string;
    candidates?: Array<{ place_id: string }>;
  };

  if (body.status === "OK" && body.candidates && body.candidates.length > 0) {
    return body.candidates[0].place_id;
  }
  return null;
}

async function fetchPlaceDetailsLegacy(placeId: string, apiKey: string): Promise<PlaceData | null> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) return null;

  const body = (await res.json()) as {
    status: string;
    result?: PlaceData;
  };

  if (body.status === "OK" && body.result) {
    return body.result;
  }
  return null;
}

const LOCATIONS = Object.keys(PLACE_QUERIES) as Array<"dallas" | "garland">;

async function refreshAllCaches(): Promise<void> {
  for (const location of LOCATIONS) {
    try {
      await getPlaceData(location);
    } catch (err) {
      logger.error({ err, location }, "Background cache refresh failed");
    }
  }
}

export async function preWarmCaches(): Promise<void> {
  logger.info("Pre-warming review caches before accepting requests");
  await refreshAllCaches();
  logger.info("Review cache pre-warm complete");
}

export function startRefreshInterval(): void {
  setInterval(() => {
    logger.info("Running scheduled review cache refresh");
    void refreshAllCaches();
  }, CACHE_TTL_MS).unref();
}

export async function getPlaceData(location: "dallas" | "garland"): Promise<PlaceData | null> {
  const apiKey = process.env["GOOGLE_PLACES_API_KEY"];
  if (!apiKey) return null;

  const now = Date.now();
  const cached = cache.get(location);

  if (cached && now - cached.cachedAt < CACHE_TTL_MS && cached.data) {
    return cached.data;
  }

  logger.info({ location }, "Cache miss — fetching fresh data from Google Places API");

  try {
    const query = PLACE_QUERIES[location];

    const newApiResult = await searchPlaceNew(query, apiKey);
    if (newApiResult) {
      cache.set(location, { placeId: newApiResult.placeId, data: newApiResult.data, cachedAt: now });
      return newApiResult.data;
    }

    let placeId = cached?.placeId ?? null;
    if (!placeId) {
      placeId = await searchPlaceLegacy(query, apiKey);
    }

    if (!placeId) {
      return null;
    }

    const data = await fetchPlaceDetailsLegacy(placeId, apiKey);
    cache.set(location, { placeId, data, cachedAt: now });
    return data;
  } catch {
    return null;
  }
}
