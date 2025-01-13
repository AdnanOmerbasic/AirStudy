"use client";
import { useState } from "react";
import { Button } from "../ui/Button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "next/form";
import { subDays } from "date-fns";

export const SearchForm = () => {
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
    <div className="relative pl-60">
      <img
        src="/img/frontpage.png"
        alt="Frontpage"
        className="rounded-lg max-w-xl"
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white p-6 -translate-x-60 rounded-md shadow-lg">
          <Form action="/stays/search">
            <div>
              <div className="relative">
                <input
                  name="location"
                  className="border py-6 px-4 w-64 rounded-md"
                />
                <label
                  htmlFor="location"
                  className="absolute left-3 top-2 text-sm pointer-events-none"
                >
                  <strong>Where</strong>
                </label>
              </div>
              <div className="border border-outlineGray relative rounded-md">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleStartDate(date || undefined)}
                  className="w-full px-8 py-6"
                  minDate={subDays(new Date(), 0)}
                  name="dateFrom"
                />
                <label
                  htmlFor="dateFrom"
                  className="absolute left-3 top-2 text-sm pointer-events-none"
                >
                  <strong>Date from</strong>
                </label>
              </div>
              <div className="border border-outlineGray relative rounded-md">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => handleEndDate(date || undefined)}
                  className="w-full px-8 py-6"
                  minDate={subDays(new Date(), 0)}
                  name="dateTo"
                />
                <label
                  htmlFor="dateTo"
                  className="absolute left-3 top-2 text-sm pointer-events-none"
                >
                  <strong>Date to</strong>
                </label>
              </div>
            </div>
            <div className="py-2">
              <Button
                variant="green"
                className="w-full"
                size="lg"
                type="submit"
              >
                Search
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
