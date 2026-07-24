import { useQuery } from "@tanstack/react-query";
import { getPagedProperties } from "../api/property";

export function usePagedProperties(
  page: number,
  size: number
) {
  return useQuery({
    queryKey: ["properties", page, size],
    queryFn: () => getPagedProperties(page, size),
  });
}