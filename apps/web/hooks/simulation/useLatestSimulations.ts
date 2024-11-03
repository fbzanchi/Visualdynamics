import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  getLatestSimulations,
  LatestSimulations,
} from "@/actions/simulation/getLatestSimulations";

export function useLatestSimulations(
  options?: UseQueryOptions<ActionResponse<LatestSimulations>, unknown>
): UseQueryResult<ActionResponse<LatestSimulations>, unknown> {
  return useQuery({
    queryKey: ["latest-simulations"],
    queryFn: () => getLatestSimulations(),
    ...options,
  });
}
