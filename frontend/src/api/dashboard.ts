import api from "./axios";

export interface DashboardSummary {
  total_properties: number;
  total_flats: number;
  occupied_flats: number;
  vacant_flats: number;
  total_tenants: number;
  active_leases: number;
  total_payments: number;
  total_rent_collected: number;
}

export const getDashboardSummary = async () => {
  const { data } = await api.get<DashboardSummary>(
    "/dashboard/summary"
  );

  return data;
};