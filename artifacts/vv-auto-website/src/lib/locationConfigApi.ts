export interface LocationConfig {
  mapsUrl: string;
  writeReviewUrl: string | null;
}

export interface LocationConfigResponse {
  dallas: LocationConfig;
  garland: LocationConfig;
}

const FALLBACK: LocationConfigResponse = {
  dallas: {
    mapsUrl: "",
    writeReviewUrl: null,
  },
  garland: {
    mapsUrl: "",
    writeReviewUrl: null,
  },
};

export async function fetchLocationConfig(): Promise<LocationConfigResponse> {
  try {
    const res = await fetch("/api/location-config");
    if (!res.ok) return FALLBACK;
    return (await res.json()) as LocationConfigResponse;
  } catch {
    return FALLBACK;
  }
}

export { FALLBACK as LOCATION_CONFIG_FALLBACK };
