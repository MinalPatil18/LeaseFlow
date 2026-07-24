import { useQuery } from "@tanstack/react-query";
import {
  getDashboardSummary,
} from "../api/dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });
}