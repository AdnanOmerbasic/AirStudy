"use client";
import { cva } from "class-variance-authority";
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const inputCVA = cva(
  "w-full px-4 py-3 border rounded-md focus:outline-none transition-colors text-left",
  {
    variants: {
      inputSize: {
        xs: "text-xs",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "xs" | "md" | "lg";
  isInvalid?: boolean;
  label: string;
  errMsg?: string;
  icon?: React.ReactNode;
}

export const Input = ({
  label,
  errMsg,
  isInvalid = false,
  inputSize = "xs",
  className,
  icon,
  ...props
}: InputProps) => {
  return (
    <div>
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm whitespace-pre-line text-black"
          >
            {label}
          </label>
        )}
      </div>
      <div className="relative w-64">
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          className={twMerge(
            inputCVA({ inputSize }),
            isInvalid
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            className,
            "min-w-[200px] w-full"
          )}
          {...props}
        />
      </div>
      {errMsg && isInvalid && <p className="text-sm text-red-500">{errMsg}</p>}
    </div>
  );
};
