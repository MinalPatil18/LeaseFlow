import { useState } from "react";

import DashboardLayout from "../components/layouts/DashboardLayout";
import LeaseForm from "../components/leases/LeaseForm";
import LeaseTable from "../components/leases/LeaseTable";

import { useProperties } from "../hooks/useProperties";
import { useFlats } from "../hooks/useFlats";
import { useTenants } from "../hooks/useTenants";
import { useLeases } from "../hooks/useLeases";

import type { Lease } from "../api/lease";

function LeasePage() {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedFlat, setSelectedFlat] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [editingLease, setEditingLease] =
    useState<Lease | null>(null);

  const { data: properties = [] } = useProperties();

  const { data: flats = [] } =
    useFlats(selectedProperty);

  const { data: tenants = [] } =
    useTenants(selectedFlat);

  const { data: leases = [] } =
    useLeases(selectedTenant);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h1 className="mb-8 text-3xl font-bold">
            Lease Management
          </h1>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Property */}

            <div>

              <label className="mb-2 block font-medium">
                Property
              </label>

              <select
                value={selectedProperty}
                onChange={(e) => {
                  setSelectedProperty(e.target.value);
                  setSelectedFlat("");
                  setSelectedTenant("");
                  setEditingLease(null);
                }}
                className="w-full rounded-xl border p-3"
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

            </div>

            {/* Flat */}

            <div>

              <label className="mb-2 block font-medium">
                Flat
              </label>

              <select
                value={selectedFlat}
                onChange={(e) => {
                  setSelectedFlat(e.target.value);
                  setSelectedTenant("");
                  setEditingLease(null);
                }}
                className="w-full rounded-xl border p-3"
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

            </div>

            {/* Tenant */}

            <div>

              <label className="mb-2 block font-medium">
                Tenant
              </label>

              <select
                value={selectedTenant}
                onChange={(e) => {
                  setSelectedTenant(e.target.value);
                  setEditingLease(null);
                }}
                className="w-full rounded-xl border p-3"
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

            </div>

          </div>

        </div>

        {selectedTenant && (
          <>
            <LeaseForm
              tenantId={selectedTenant}
              flatId={selectedFlat}
              editingLease={editingLease}
              onSuccess={() =>
                setEditingLease(null)
              }
            />

            <LeaseTable
              leases={leases}
              tenantId={selectedTenant}
              onEdit={setEditingLease}
            />
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default LeasePage;