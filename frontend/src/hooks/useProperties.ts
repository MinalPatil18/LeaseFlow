import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../api/property";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
}