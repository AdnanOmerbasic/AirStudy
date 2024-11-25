"use client";
import React, { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { motion, MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

const buttonCVA = cva(
  "inline flex items-center justify-center rounded-2xl font-medium",
  {
    variants: {
      variant: {
        primary: "bg-orange-400 text-black hover:shadow-lg hover:bg-orange-500",
        secondary: "bg-white text-black border border-black border-[2px]",
        blue: "bg-blue-500 text-white hover:shadow-lg hover:bg-blue-600",
        danger: "bg-red-500 text-white hover:shadow-lg hover:bg-red-600",
      },
      size: {
        sm: "px-8 py-2 text-sm",
        md: "px-10 py-2 text-md",
        lg: "px-16 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type MotionButtonProps = MotionProps & ButtonHTMLAttributes<HTMLButtonElement>

interface ButtonProps extends MotionButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "blue" | "danger";
  size?: "sm" | "md" | "lg"
}

export const Button = ({ children, className, variant = "primary", size = "md", ...props }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={twMerge(buttonCVA({ variant, size }), className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
