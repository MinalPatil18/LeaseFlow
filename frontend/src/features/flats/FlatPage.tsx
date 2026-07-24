import { useMemo, useState } from "react";
import { Building2, Home, Plus, Search } from "lucide-react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import FlatForm from "./FlatForm";
import FlatTable from "./FlatTable";

import { useProperties } from "../../hooks/useProperties";
import { useFlats } from "../../hooks/useFlats";

import type { Flat } from "../../api/flat";

function FlatPage() {
  const [selectedProperty, setSelectedProperty] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingFlat, setEditingFlat] =
    useState<Flat | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const pageSize = 5;

  const { data: properties = [] } =
    useProperties();

  const {
    data: flats = [],
    isLoading,
  } = useFlats(selectedProperty);

  const filteredFlats = useMemo(() => {
    return flats.filter((flat) =>
      flat.flat_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [flats, searchTerm]);

  const totalPages = Math.ceil(
    filteredFlats.length / pageSize
  );

  const paginatedFlats = filteredFlats.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const occupied = flats.filter(
    (f) =>
      f.status.toLowerCase() ===
      "occupied"
  ).length;

  const vacant = flats.filter(
    (f) =>
      f.status.toLowerCase() ===
      "vacant"
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-black text-slate-900">
              Flats
            </h1>

            <p className="mt-2 text-slate-500">
              Manage flats for your properties.
            </p>

          </div>

          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingFlat(null);
              } else {
                setShowForm(true);
              }
            }}
            disabled={!selectedProperty}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={20} />

            {showForm
              ? "Close Form"
              : "Add Flat"}

          </button>

        </div>

        {/* Property Selector */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">

          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Select Property
          </label>

          <select
            value={selectedProperty}
            onChange={(e) => {
              setSelectedProperty(
                e.target.value
              );
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-pink-500"
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

        {/* Stats */}

        {selectedProperty && (

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <Home className="mb-3 text-pink-500" />

              <p className="text-sm text-slate-500">
                Total Flats
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {flats.length}
              </h2>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <Building2 className="mb-3 text-green-500" />

              <p className="text-sm text-slate-500">
                Occupied
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {occupied}
              </h2>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">

              <Building2 className="mb-3 text-orange-500" />

              <p className="text-sm text-slate-500">
                Vacant
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {vacant}
              </h2>

            </div>

          </div>

        )}

        {/* Search */}

        {selectedProperty && (

          <div className="flex max-w-md items-center gap-3 rounded-2xl border bg-white px-4 py-3">

            <Search
              size={20}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Flat..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              className="w-full bg-transparent outline-none"
            />

          </div>

        )}

        {/* Form */}

        {showForm && selectedProperty && (

          <FlatForm
            propertyId={selectedProperty}
            editingFlat={editingFlat}
            onSuccess={() => {
              setShowForm(false);
              setEditingFlat(null);
            }}
          />

        )}

        {/* Table */}

        {selectedProperty ? (
          isLoading ? (

            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              Loading Flats...
            </div>

          ) : (

            <>
              <FlatTable
                flats={paginatedFlats}
                onEdit={(flat) => {
                  setEditingFlat(flat);
                  setShowForm(true);
                }}
              />

              {totalPages > 1 && (

                <div className="flex items-center justify-between">

                  <button
                    onClick={() =>
                      setCurrentPage(
                        (p) => p - 1
                      )
                    }
                    disabled={
                      currentPage === 1
                    }
                    className="rounded-xl border px-4 py-2 disabled:opacity-50"
                  >
                    ← Previous
                  </button>

                  <span className="font-medium">
                    Page {currentPage} of{" "}
                    {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage(
                        (p) => p + 1
                      )
                    }
                    disabled={
                      currentPage ===
                      totalPages
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

            Select a property to manage its flats.

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default FlatPage;