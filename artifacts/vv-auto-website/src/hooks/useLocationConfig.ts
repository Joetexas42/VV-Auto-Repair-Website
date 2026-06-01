import { useQuery } from "@tanstack/react-query";
import {
  fetchLocationConfig,
  LOCATION_CONFIG_FALLBACK,
  type LocationConfigResponse,
} from "@/lib/locationConfigApi";

export function useLocationConfig() {
  return useQuery<LocationConfigResponse, Error>({
    queryKey: ["locationConfig"],
    queryFn: fetchLocationConfig,
    staleTime: 60 * 60 * 1000,
    placeholderData: LOCATION_CONFIG_FALLBACK,
    retry: 1,
  });
}
