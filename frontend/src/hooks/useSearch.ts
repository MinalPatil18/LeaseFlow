import { useQuery } from "@tanstack/react-query";
import { searchAll } from "../api/search";

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchAll(query),
    enabled: query.length > 1,
  });
}