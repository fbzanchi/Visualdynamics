import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  fetchLatestSimulations,
  LatestSimulations,
} from "@/actions/simulation/fetchLatestSimulations";

export function useLatestSimulations(
  options?: UseQueryOptions<ActionResponse<LatestSimulations>, unknown>
): UseQueryResult<ActionResponse<LatestSimulations>, unknown> {
  return useQuery({
    queryKey: ["latest-simulations"],
    queryFn: () => fetchLatestSimulations(),
    ...options,
  });
}
