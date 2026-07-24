import api from "./axios";

export interface SearchResult {
  id: number;
  type: "Property" | "Flat" | "Tenant" | "Lease" | "Payment";
  title: string;
  subtitle: string;
}

export const searchAll = async (
  query: string
): Promise<SearchResult[]> => {
  const { data } = await api.get("/search", {
    params: { q: query },
  });

  return data;
};