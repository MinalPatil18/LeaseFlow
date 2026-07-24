import { useQuery } from "@tanstack/react-query";

import { getPaymentsByLease } from "../api/payment";

export function usePayments(
  leaseId: string
) {
  return useQuery({
    queryKey: ["payments", leaseId],
    queryFn: () =>
      getPaymentsByLease(leaseId),
    enabled: !!leaseId,
  });
}