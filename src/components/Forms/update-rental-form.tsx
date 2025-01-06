"use client";

import { useActionState } from "react";
import * as actions from "@/actions"; // Importer din server action
import { Input } from "@/components/ui/Input/input";

export default function UpdateRentalForm({ id }: { id: string }) {
  const [formState, action] = useActionState(
    actions.updateRental.bind(null, { id }),
    {
      errors: {},
    }
  );

  return (
    <form action={action} className="space-y-4">
      {/* Title */}
      <div>
        <Input
          type="text"
          label="Input"
          name="title"
          id="title"
          placeholder="Enter title"
          className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter description"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter address"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Images */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium">
          Upload New Images
        </label>
        <input
          type="file"
          name="file"
          id="file"
          multiple
          accept="image/*"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* End Date */}
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Rental
        </button>
      </div>
    </form>
  );
}
