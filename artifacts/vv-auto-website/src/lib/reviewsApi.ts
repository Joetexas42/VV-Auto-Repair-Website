export interface LiveReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description?: string;
  profile_photo_url?: string;
}

export interface LocationReviewData {
  rating?: number;
  user_ratings_total?: number;
  reviews?: LiveReview[];
}

export interface AllReviewsResponse {
  dallas: LocationReviewData | null;
  garland: LocationReviewData | null;
}

export async function fetchAllReviews(): Promise<AllReviewsResponse | null> {
  try {
    const res = await fetch("/api/reviews");
    if (!res.ok) return null;
    return (await res.json()) as AllReviewsResponse;
  } catch {
    return null;
  }
}

export async function fetchReviewsForLocation(
  location: "dallas" | "garland"
): Promise<LocationReviewData | null> {
  try {
    const res = await fetch(`/api/reviews?location=${location}`);
    if (!res.ok) return null;
    const body = (await res.json()) as { location: string; data: LocationReviewData | null };
    return body.data;
  } catch {
    return null;
  }
}
