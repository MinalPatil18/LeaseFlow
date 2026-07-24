import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  uploadPropertyImage,
  getPropertyImages,
  deletePropertyImage,
  setPrimaryPropertyImage,
  type PropertyImage,
} from "../../api/property";

interface Props {
  propertyId: string;
}

function PropertyImages({ propertyId }: Props) {
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);

  const { data: images = [], isLoading } = useQuery<
    PropertyImage[]
  >({
    queryKey: ["property-images", propertyId],
    queryFn: () => getPropertyImages(propertyId),
    enabled: !!propertyId,
  });

  const uploadMutation = useMutation({
    mutationFn: (image: File) =>
      uploadPropertyImage(propertyId, image),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["property-images", propertyId],
      });

      setFile(null);
      alert("Image uploaded successfully!");
    },

    onError: () => {
      alert("Failed to upload image.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePropertyImage,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["property-images", propertyId],
      });
    },

    onError: () => {
      alert("Failed to delete image.");
    },
  });

  const primaryMutation = useMutation({
    mutationFn: setPrimaryPropertyImage,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["property-images", propertyId],
      });
    },

    onError: () => {
      alert("Failed to set primary image.");
    },
  });

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Property Images
      </h2>

      <div className="mb-6 flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />

        <button
          type="button"
          disabled={!file || uploadMutation.isPending}
          onClick={() => {
            if (file) {
              uploadMutation.mutate(file);
            }
          }}
          className="rounded-xl bg-pink-500 px-5 py-2 font-semibold text-white disabled:opacity-50"
        >
          {uploadMutation.isPending
            ? "Uploading..."
            : "Upload"}
        </button>
      </div>

      {isLoading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-slate-500">
          No images uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="rounded-2xl border p-3"
            >
              <img
                src={image.image_url}
                alt="Property"
                className="h-40 w-full rounded-xl object-cover"
              />

              <div className="mt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() =>
                    primaryMutation.mutate(image.id)
                  }
                  className="text-sm font-medium text-blue-600"
                >
                  {image.is_primary
                    ? "Primary"
                    : "Set Primary"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteMutation.mutate(image.id)
                  }
                  className="text-sm font-medium text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyImages;