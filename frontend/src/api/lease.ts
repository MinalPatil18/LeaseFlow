import api from "./axios";

export interface Lease {
  id: string;
  tenant_id: string;
  flat_id: string;
  lease_start: string;
  lease_end: string;
  monthly_rent: number;
  security_deposit: number;
  due_day: number;
  status: string;
}

export interface CreateLeaseRequest {
  tenant_id: string;
  flat_id: string;
  lease_start: string;
  lease_end: string;
  monthly_rent: number;
  security_deposit: number;
  due_day: number;
}

export interface UpdateLeaseRequest {
  lease_start?: string;
  lease_end?: string;
  monthly_rent?: number;
  security_deposit?: number;
  due_day?: number;
  status?: string;
}

export const getLeasesByTenant = async (
  tenantId: string
): Promise<Lease[]> => {
  const { data } = await api.get(`/leases/tenant/${tenantId}`);
  return data;
};

export const getLease = async (
  leaseId: string
): Promise<Lease> => {
  const { data } = await api.get(`/leases/${leaseId}`);
  return data;
};

export const createLease = async (
  payload: CreateLeaseRequest
): Promise<Lease> => {
  const { data } = await api.post("/leases", payload);
  return data;
};

export const updateLease = async (
  leaseId: string,
  payload: UpdateLeaseRequest
): Promise<Lease> => {
  const { data } = await api.patch(
    `/leases/${leaseId}`,
    payload
  );

  return data;
};

export const deleteLease = async (
  leaseId: string
): Promise<string> => {
  const { data } = await api.delete(`/leases/${leaseId}`);
  return data;
};