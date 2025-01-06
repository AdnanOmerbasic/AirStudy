"use client";
import React, { useState } from "react";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import clsx from "clsx";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  onDelete?: () => void;
  input: string;
  action: (FormData: FormData) => Promise<void>;
  ref?: React.Ref<HTMLDivElement>;
}

export const Modal = ({
  action,
  ref,
  onClose,
  onDelete,
  input,
  ...props
}: ModalProps) => {
  const [inputVal, setInputVal] = useState("");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white p-10 rounded-xl shadow-md max-w-3xl text-center w-screen"
        {...props}
        ref={ref}
      >
        <h2>
          <span className="text-2xl">Are you sure you want to delete</span>
          <br />
          <strong>{input}</strong>
        </h2>
        <div className="p-6 flex justify-center items-center w-full">
          <Input
            type="text"
            label={`Type ${input} below to confirm`}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>
        <div className="pt-6 flex justify-center w-full space-x-10">
          <Button onClick={onClose}>Cancel</Button>
          <form action={action}>
            <Button
              variant="danger"
              disabled={inputVal !== input}
              className={clsx(
                inputVal !== input
                  ? "bg-gray-300 cursor-not-allowed text-white hover:bg-gray-300 transition-none"
                  : ""
              )}
            >
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
