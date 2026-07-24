import api from "./axios";

export interface Property {
  id: string;
  owner_id: string;
  property_name: string;
  property_type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  is_active: boolean;
}

export interface CreatePropertyRequest {
  property_name: string;
  property_type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
}

export interface UpdatePropertyRequest
  extends CreatePropertyRequest {
  is_active: boolean;
}

export interface PaginatedProperties {
  items: Property[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_primary: boolean;
}

export async function getProperties(): Promise<Property[]> {
  const { data } = await api.get("/properties");
  return data;
}

export async function getProperty(
  id: string
): Promise<Property> {
  const { data } = await api.get(`/properties/${id}`);
  return data;
}

export async function createProperty(
  property: CreatePropertyRequest
): Promise<Property> {
  const { data } = await api.post(
    "/properties",
    property
  );

  return data;
}

export async function updateProperty(
  id: string,
  property: UpdatePropertyRequest
): Promise<Property> {
  const { data } = await api.patch(
    `/properties/${id}`,
    property
  );

  return data;
}

export async function deleteProperty(
  id: string
): Promise<void> {
  await api.delete(`/properties/${id}`);
}

export async function searchProperties(
  city?: string,
  propertyType?: string
): Promise<Property[]> {
  const { data } = await api.get(
    "/properties/search",
    {
      params: {
        city,
        property_type: propertyType,
      },
    }
  );

  return data;
}

export async function getPagedProperties(
  page: number,
  size: number
): Promise<PaginatedProperties> {
  const { data } = await api.get(
    "/properties/paged",
    {
      params: {
        page,
        size,
      },
    }
  );

  return data;
}

export async function getSortedProperties(
  sort = "property_name"
): Promise<Property[]> {
  const { data } = await api.get(
    "/properties/sorted",
    {
      params: {
        sort,
      },
    }
  );

  return data;
}

/* ============================
   PROPERTY IMAGES
============================ */

export async function uploadPropertyImage(
  propertyId: string,
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post(
    `/properties/${propertyId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function getPropertyImages(
  propertyId: string
): Promise<PropertyImage[]> {
  const { data } = await api.get(
    `/properties/${propertyId}/images`
  );

  return data;
}

export async function deletePropertyImage(
  imageId: string
) {
  const { data } = await api.delete(
    `/properties/images/${imageId}`
  );

  return data;
}

export async function setPrimaryPropertyImage(
  imageId: string
) {
  const { data } = await api.patch(
    `/properties/images/${imageId}/primary`
  );

  return data;
}