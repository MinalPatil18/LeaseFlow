import api from "./axios";

export interface Flat {
  id: string;
  property_id: string;
  flat_number: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  rent_amount: number;
  deposit_amount: number;
  status: string;
}

export interface CreateFlatRequest {
  property_id: string;
  flat_number: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  rent_amount: number;
  deposit_amount: number;
}

export interface UpdateFlatRequest {
  flat_number: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  rent_amount: number;
  deposit_amount: number;
  status: string;
}

export async function getFlatsByProperty(
  propertyId: string
): Promise<Flat[]> {
  const { data } = await api.get(
    `/flats/property/${propertyId}`
  );

  return data;
}

export async function createFlat(
  flat: CreateFlatRequest
): Promise<Flat> {
  const { data } = await api.post(
    "/flats",
    flat
  );

  return data;
}

export async function getFlat(
  id: string
): Promise<Flat> {
  const { data } = await api.get(
    `/flats/${id}`
  );

  return data;
}

export async function updateFlat(
  id: string,
  flat: UpdateFlatRequest
): Promise<Flat> {
  const { data } = await api.patch(
    `/flats/${id}`,
    flat
  );

  return data;
}

export async function deleteFlat(
  id: string
): Promise<void> {
  await api.delete(`/flats/${id}`);
}