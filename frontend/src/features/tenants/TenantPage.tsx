import { useMemo, useState } from "react";
import {
  Building2,
  Home,
  Plus,
  Search,
  Users,
} from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import TenantForm from "./TenantForm";
import TenantTable from "./TenantTable";

import { useProperties } from "../../hooks/useProperties";
import { useFlats } from "../../hooks/useFlats";
import { useTenants } from "../../hooks/useTenants";

import type { Tenant } from "../../api/tenant";

function TenantPage() {
  const [selectedProperty, setSelectedProperty] =
    useState("");

  const [selectedFlat, setSelectedFlat] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingTenant, setEditingTenant] =
    useState<Tenant | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const pageSize = 5;

  const { data: properties = [] } =
    useProperties();

  const { data: flats = [] } =
    useFlats(selectedProperty);

  const {
    data: tenants = [],
    isLoading,
  } = useTenants(selectedFlat);

  const filteredTenants = useMemo(() => {
    return tenants.filter(
      (tenant) =>
        tenant.full_name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        tenant.email
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        tenant.phone.includes(searchTerm)
    );
  }, [tenants, searchTerm]);

  const totalPages = Math.ceil(
    filteredTenants.length / pageSize
  );

  const paginatedTenants =
    filteredTenants.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

  const active = tenants.filter(
    (tenant) => tenant.is_active
  ).length;

  const inactive = tenants.filter(
    (tenant) => !tenant.is_active
  ).length;

  function handleCloseForm() {
    setShowForm(false);
    setEditingTenant(null);
  }

  function handlePropertyChange(
    value: string
  ) {
    setSelectedProperty(value);
    setSelectedFlat("");
    setSearchTerm("");
    setCurrentPage(1);
    setShowForm(false);
    setEditingTenant(null);
  }

  function handleFlatChange(
    value: string
  ) {
    setSelectedFlat(value);
    setSearchTerm("");
    setCurrentPage(1);
    setShowForm(false);
    setEditingTenant(null);
  }

  return (
        <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-black text-slate-900">
              Tenants
            </h1>

            <p className="mt-2 text-slate-500">
              Manage tenants for your flats.
            </p>
          </div>

          <button
            disabled={!selectedFlat}
            onClick={() => {
              if (showForm) {
                handleCloseForm();
              } else {
                setShowForm(true);
              }
            }}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={20} />
            {showForm ? "Close Form" : "Add Tenant"}
          </button>

        </div>

        {/* Property & Flat */}

        <div className="grid gap-4 md:grid-cols-2">

          <select
            value={selectedProperty}
            onChange={(e) =>
              handlePropertyChange(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white p-3"
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
            onChange={(e) =>
              handleFlatChange(e.target.value)
            }
            disabled={!selectedProperty}
            className="rounded-xl border border-slate-200 bg-white p-3 disabled:opacity-50"
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

        {/* Stats */}

        {selectedFlat && (

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <Users className="mb-3 text-pink-500" />
              <p className="text-sm text-slate-500">
                Total Tenants
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                {tenants.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <Building2 className="mb-3 text-green-500" />
              <p className="text-sm text-slate-500">
                Active
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                {active}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <Home className="mb-3 text-orange-500" />
              <p className="text-sm text-slate-500">
                Inactive
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                {inactive}
              </h2>
            </div>

          </div>

        )}

        {/* Search */}

        {selectedFlat && (

          <div className="flex max-w-md items-center gap-3 rounded-2xl border bg-white px-4 py-3">

            <Search
              size={20}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search tenant..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent outline-none"
            />

          </div>

        )}

        {/* Form */}

        {showForm && selectedFlat && (

          <TenantForm
            flatId={selectedFlat}
            editingTenant={editingTenant}
            onSuccess={handleCloseForm}
          />

        )}

        {/* Table */}

        {selectedFlat ? (

          isLoading ? (

            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              Loading Tenants...
            </div>

          ) : (

            <>
              <TenantTable
                tenants={paginatedTenants}
                onEdit={(tenant) => {
                  setEditingTenant(tenant);
                  setShowForm(true);
                }}
              />

              {totalPages > 1 && (

                <div className="flex items-center justify-between">

                  <button
                    onClick={() =>
                      setCurrentPage((p) => p - 1)
                    }
                    disabled={currentPage === 1}
                    className="rounded-xl border px-4 py-2 disabled:opacity-50"
                  >
                    ← Previous
                  </button>

                  <span className="font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => p + 1)
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className="rounded-xl border px-4 py-2 disabled:opacity-50"
                  >
                    Next →
                  </button>

                </div>

              )}

            </>

          )

        ) : (

          <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">
            Select a flat to manage tenants.
          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default TenantPage;
