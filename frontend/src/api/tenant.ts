import api from "./axios";

export interface Tenant {
  id: string;
  flat_id: string;
  full_name: string;
  email: string;
  phone: string;
  aadhaar_number: string;
  occupation: string;
  emergency_contact: string;
  move_in_date: string;
  move_out_date: string | null;
  is_active: boolean;
}

export interface CreateTenantRequest {
  flat_id: string;
  full_name: string;
  email: string;
  phone: string;
  aadhaar_number: string;
  occupation: string;
  emergency_contact: string;
  move_in_date: string;
}

export interface UpdateTenantRequest {
  full_name: string;
  email: string;
  phone: string;
  aadhaar_number: string;
  occupation: string;
  emergency_contact: string;
  move_in_date: string;
  move_out_date: string | null;
  is_active: boolean;
}

export async function createTenant(
  tenant: CreateTenantRequest
): Promise<Tenant> {
  const { data } = await api.post(
    "/tenants",
    tenant
  );

  return data;
}

export async function getTenant(
  tenantId: string
): Promise<Tenant> {
  const { data } = await api.get(
    `/tenants/${tenantId}`
  );

  return data;
}

export async function getTenantsByFlat(
  flatId: string
): Promise<Tenant[]> {
  const { data } = await api.get(
    `/tenants/flat/${flatId}`
  );

  return data;
}

export async function updateTenant(
  tenantId: string,
  tenant: UpdateTenantRequest
): Promise<Tenant> {
  const { data } = await api.patch(
    `/tenants/${tenantId}`,
    tenant
  );

  return data;
}

export async function deleteTenant(
  tenantId: string
): Promise<void> {
  await api.delete(
    `/tenants/${tenantId}`
  );
}