import { useQuery } from "@tanstack/react-query";

import { getLeasesByTenant } from "../api/lease";

export function useLeases(tenantId: string) {
  return useQuery({
    queryKey: ["leases", tenantId],

    queryFn: () => getLeasesByTenant(tenantId),

    enabled: !!tenantId,
  });
}