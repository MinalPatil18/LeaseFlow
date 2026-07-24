import { useState } from "react";

import DashboardLayout from "../components/layouts/DashboardLayout";

import PaymentForm from "../components/payments/PaymentForm";
import PaymentTable from "../components/payments/PaymentTable";

import { useProperties } from "../hooks/useProperties";
import { useFlats } from "../hooks/useFlats";
import { useTenants } from "../hooks/useTenants";
import { useLeases } from "../hooks/useLeases";
import { usePayments } from "../hooks/usePayments";

import { type Payment } from "../api/payment";

function PaymentPage() {
  const [selectedProperty, setSelectedProperty] =
    useState("");

  const [selectedFlat, setSelectedFlat] =
    useState("");

  const [selectedTenant, setSelectedTenant] =
    useState("");

  const [selectedLease, setSelectedLease] =
    useState("");

  const [editingPayment, setEditingPayment] =
    useState<Payment | null>(null);

  const { data: properties = [] } =
    useProperties();

  const { data: flats = [] } =
    useFlats(selectedProperty);

  const { data: tenants = [] } =
    useTenants(selectedFlat);

  const { data: leases = [] } =
    useLeases(selectedTenant);

  const { data: payments = [] } =
    usePayments(selectedLease);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Payments
        </h1>

        <div className="grid gap-4 md:grid-cols-4">

          <select
            value={selectedProperty}
            onChange={(e) => {
              setSelectedProperty(
                e.target.value
              );

              setSelectedFlat("");
              setSelectedTenant("");
              setSelectedLease("");
            }}
            className="rounded-xl border p-3"
          >
            <option value="">
              Select Property
            </option>

            {properties.map((property) => (
              <option
                key={property.id}
                value={property.id}
              >
                {property.property_name}
              </option>
            ))}
          </select>

          <select
            value={selectedFlat}
            onChange={(e) => {
              setSelectedFlat(
                e.target.value
              );

              setSelectedTenant("");
              setSelectedLease("");
            }}
            disabled={!selectedProperty}
            className="rounded-xl border p-3"
          >
            <option value="">
              Select Flat
            </option>

            {flats.map((flat) => (
              <option
                key={flat.id}
                value={flat.id}
              >
                {flat.flat_number}
              </option>
            ))}
          </select>

          <select
            value={selectedTenant}
            onChange={(e) => {
              setSelectedTenant(
                e.target.value
              );

              setSelectedLease("");
            }}
            disabled={!selectedFlat}
            className="rounded-xl border p-3"
          >
            <option value="">
              Select Tenant
            </option>

            {tenants.map((tenant) => (
              <option
                key={tenant.id}
                value={tenant.id}
              >
                {tenant.full_name}
              </option>
            ))}
          </select>

          <select
            value={selectedLease}
            onChange={(e) =>
              setSelectedLease(
                e.target.value
              )
            }
            disabled={!selectedTenant}
            className="rounded-xl border p-3"
          >
            <option value="">
              Select Lease
            </option>

            {leases.map((lease) => (
              <option
                key={lease.id}
                value={lease.id}
              >
                {lease.lease_start} - {lease.lease_end}
              </option>
            ))}
                    </select>

        </div>

        {selectedLease && (
          <>
            <PaymentForm
              leaseId={selectedLease}
              editingPayment={editingPayment}
              onSuccess={() =>
                setEditingPayment(null)
              }
            />

            <PaymentTable
              payments={payments}
              leaseId={selectedLease}
              onEdit={(payment) =>
                setEditingPayment(payment)
              }
            />
          </>
        )}

      </div>

    </DashboardLayout>
  );
}

export default PaymentPage;