"use client";

import { useActionState, useRef, useState } from "react";
import * as actions from "@/actions";
import { Input } from "@/components/ui/Input/input";
import { ImageUpload } from "@/components/ui/ImageUpload/image-upload";
import { Button } from "../ui/Button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

export default function RentalForm() {
  const [state, action] = useActionState(actions.createRental, {
    values: {
      title: "",
      description: "",
      country: "",
      city: "",
      address: "",
      price: 0,
    },
    errors: {},
  });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleStartDate = (startDate: Date | undefined) => {
    if (startDate) {
      setStartDate(startDate);
    }
  };

  const handleEndDate = (endDate: Date | undefined) => {
    if (endDate) {
      setEndDate(endDate);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <form action={action} className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create Rental
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              isInvalid={!!state.errors.title}
              errMsg={state.errors.title?.join(" ") as string}
              type="text"
              label="Title"
              name="title"
              id="title"
              placeholder="Title"
              defaultValue={!!state.errors.title ? "" : state.values?.title}
              className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Input
              isInvalid={!!state.errors.country}
              errMsg={state.errors.country?.join(" ") as string}
              type="text"
              label="Country"
              name="country"
              id="country"
              placeholder="Country"
              defaultValue={state.values?.country}
              className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Input
              isInvalid={!!state.errors.city}
              errMsg={state.errors.city?.join(" ") as string}
              type="text"
              label="City"
              name="city"
              id="city"
              placeholder="City"
              defaultValue={state.values?.city}
              className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <Input
              isInvalid={!!state.errors.address}
              errMsg={state.errors.address?.join(" ") as string}
              type="text"
              label="Address"
              name="address"
              id="address"
              placeholder="Address"
              defaultValue={state.values?.city}
              className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter description"
              defaultValue={
                state.errors.country ? "" : state.values?.description
              }
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-outlineGray rounded-lg"
              rows={4}
            />
            {state.errors.description && (
              <p className="text-sm text-red-500">
                {state.errors.description.join(" ")}
              </p>
            )}
          </div>
          <div className="flex justify-center space-x-4 col-span-2">
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 text-center"
              >
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleStartDate(date || undefined)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-center"
                minDate={subDays(new Date(), 0)}
                name="startDate"
                id="startDate"
                excludeDates={[new Date()]}
                placeholderText="dd/mm/yy"
              />
              {state.errors.startDate && (
                <p className="text-sm text-red-500">
                  {state.errors.startDate.join(" ")}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 text-center"
              >
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleEndDate(date || undefined)}
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-center"
                minDate={subDays(new Date(), 0)}
                name="endDate"
                id="endDate"
                excludeDates={[new Date()]}
                placeholderText="dd/mm/yy"
              />
              {state.errors.endDate && (
                <p className="text-sm text-red-500">
                  {state.errors.endDate.join(" ")}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 col-span-2">
            <Input
              isInvalid={!!state.errors.price}
              errMsg={state.errors.price?.join(" ") as string}
              type="number"
              label="Price"
              name="price"
              id="price"
              placeholder="Enter price"
              defaultValue={!!state.errors.price ? "" : state.values?.city}
              className="mt-1 block text-sm border outlineGray rounded-md shadow-sm w-full"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <ImageUpload
              name="images"
              isInvalid={!!state.errors.images}
              errMsg={state.errors.images?.join(" ") as string}
            />
          </div>
          <div className="col-span-2 mt-44">
            <Button type="submit" className="w-full">
              Create Rental
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
