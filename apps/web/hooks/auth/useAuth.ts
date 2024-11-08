import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { validateAuth } from "@/actions/auth/validateAuth";

export function useAuth(
  options?: UseQueryOptions<ValidateAuth | null, unknown>
): UseQueryResult<ValidateAuth | null, unknown> {
  return useQuery({
    queryKey: ["user-auth"],
    queryFn: () => validateAuth(),
    ...options,
  });
}
