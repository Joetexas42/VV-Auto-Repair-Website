import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";
import { LOCATIONS } from "@/constants/data";

export interface LocationUrlConfig {
  mapsUrl: string;
  writeReviewUrl: string | null;
}

export interface LocationConfigResponse {
  dallas: LocationUrlConfig;
  garland: LocationUrlConfig;
}

function getApiBaseUrl(): string {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/api`;
  }
  const replitDomain = process.env["EXPO_PUBLIC_REPLIT_DEV_DOMAIN"];
  if (replitDomain) {
    return `https://${replitDomain}/api`;
  }
  return "/api";
}

const FALLBACK: LocationConfigResponse = {
  dallas: {
    mapsUrl: LOCATIONS.dallas.mapUrl,
    writeReviewUrl: null,
  },
  garland: {
    mapsUrl: LOCATIONS.garland.mapUrl,
    writeReviewUrl: null,
  },
};

async function fetchLocationConfig(): Promise<LocationConfigResponse> {
  const url = `${getApiBaseUrl()}/location-config`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Location config fetch failed: ${res.status}`);
  return res.json() as Promise<LocationConfigResponse>;
}

export function useLocationConfig() {
  return useQuery<LocationConfigResponse, Error>({
    queryKey: ["locationConfig"],
    queryFn: fetchLocationConfig,
    staleTime: 60 * 60 * 1000,
    placeholderData: FALLBACK,
    retry: 1,
  });
}
