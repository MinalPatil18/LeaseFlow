import api from "./axios";

export interface Payment {
  id: string;
  lease_id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  receipt_number: string;
  status: string;
}

export interface CreatePaymentRequest {
  lease_id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  receipt_number: string;
}

export interface UpdatePaymentRequest {
  amount: number;
  payment_date: string;
  payment_method: string;
  receipt_number: string;
  status: string;
}

export async function getPaymentsByLease(
  leaseId: string
) {
  const res = await api.get<Payment[]>(
    `/payments/lease/${leaseId}`
  );

  return res.data;
}

export async function getPayment(
  paymentId: string
) {
  const res = await api.get<Payment>(
    `/payments/${paymentId}`
  );

  return res.data;
}

export async function createPayment(
  data: CreatePaymentRequest
) {
  const res = await api.post<Payment>(
    "/payments",
    data
  );

  return res.data;
}

export async function updatePayment(
  paymentId: string,
  data: UpdatePaymentRequest
) {
  const res = await api.patch<Payment>(
    `/payments/${paymentId}`,
    data
  );

  return res.data;
}

export async function deletePayment(
  paymentId: string
) {
  const res = await api.delete<string>(
    `/payments/${paymentId}`
  );

  return res.data;
}