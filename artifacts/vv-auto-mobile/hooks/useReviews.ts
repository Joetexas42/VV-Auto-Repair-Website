import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";

export interface PlaceReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description?: string;
  profile_photo_url?: string;
}

export interface LocationReviewData {
  rating: number;
  user_ratings_total: number;
  reviews: PlaceReview[];
}

export interface AllLocationsReviews {
  dallas: LocationReviewData;
  garland: LocationReviewData;
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

async function fetchReviews(): Promise<AllLocationsReviews> {
  const url = `${getApiBaseUrl()}/reviews`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Reviews fetch failed: ${res.status}`);
  return res.json() as Promise<AllLocationsReviews>;
}

export function useReviews() {
  return useQuery<AllLocationsReviews, Error>({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
}
