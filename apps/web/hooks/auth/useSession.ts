import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { validateSession } from "@/actions/auth/validateSession";

export function useSession(
  options?: UseQueryOptions<ValidateRequest | null, unknown>
): UseQueryResult<ValidateRequest | null, unknown> {
  return useQuery({
    queryKey: ["user-session"],
    queryFn: () => validateSession(),
    ...options,
  });
}
