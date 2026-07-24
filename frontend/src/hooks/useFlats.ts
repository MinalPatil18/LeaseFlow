import { useQuery } from "@tanstack/react-query";

import { getFlatsByProperty } from "../api/flat";

export function useFlats(propertyId: string) {
  return useQuery({
    queryKey: ["flats", propertyId],

    queryFn: () =>
      getFlatsByProperty(propertyId),

    enabled: !!propertyId,
  });
}