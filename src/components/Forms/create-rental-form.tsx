"use client";

import { useActionState, useState } from "react";
import * as actions from "@/actions";
import { Input } from "@/components/ui/Input/input";
import { ImageUpload } from "@/components/ui/ImageUpload/image-upload";
import { Button } from "../ui/Button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

export default function RentalForm() {
  const [formState, action] = useActionState(actions.createRental, {
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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Create Rental</h1>
      <form action={action} className="space-y-10">
        <div>
          <Input
            isInvalid={!!formState.errors.title}
            errMsg={formState.errors.title?.join(" ") as string}
            type="text"
            label="Input"
            name="title"
            id="title"
            placeholder="Enter title"
            defaultValue={formState.values?.title}
            className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            defaultValue={formState.values?.description}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <Input
            isInvalid={!!formState.errors.country}
            errMsg={formState.errors.country?.join(" ") as string}
            type="text"
            label="Enter country"
            name="country"
            id="country"
            placeholder="Country"
            defaultValue={formState.values?.country}
            className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
          />
        </div>
        <div>
          <Input
            isInvalid={!!formState.errors.city}
            errMsg={formState.errors.city?.join(" ") as string}
            type="text"
            label="Input"
            name="city"
            id="city"
            placeholder="city"
            defaultValue={formState.values?.city}
            className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
          />
        </div>
        <div>
          <Input
            isInvalid={!!formState.errors.address}
            errMsg={formState.errors.address?.join(" ") as string}
            type="text"
            label="Address"
            name="address"
            id="address"
            placeholder="Enter your address"
            defaultValue={formState.values?.city}
            className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
          />
        </div>
        <div>
          <Input
            isInvalid={!!formState.errors.price}
            errMsg={formState.errors.price?.join(" ") as string}
            type="number"
            label="Price"
            name="price"
            id="price"
            placeholder="Enter price"
            defaultValue={formState.values?.city}
            className="mt-1 block w-96 text-sm border outlineGray rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartDate(date || undefined)}
            className="w-full px-3 py-6"
            minDate={subDays(new Date(), 0)}
            name="startDate"
            id="startDate"
            excludeDates={[new Date()]}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleEndDate(date || undefined)}
            className="w-full px-3 py-6"
            minDate={subDays(new Date(), 0)}
            name="endDate"
            id="endDate"
            excludeDates={[new Date()]}
          />
        </div>
        <ImageUpload name="file" />
        <div>
          <Button className="mt-40" type="submit">
            Create Rental
          </Button>
        </div>
      </form>
    </div>
  );
}
