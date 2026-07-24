import { useQuery } from "@tanstack/react-query";

import { getTenantsByFlat } from "../api/tenant";

export function useTenants(flatId: string) {
  return useQuery({
    queryKey: ["tenants", flatId],

    queryFn: () => getTenantsByFlat(flatId),

    enabled: !!flatId,
  });
}