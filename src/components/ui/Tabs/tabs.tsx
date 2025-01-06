"use client";
import { useState } from "react";
import { clsx } from "clsx";

interface TabsProps {
  header: string[];
  body: React.ReactNode[];
}

export const Tabs = ({ header, body }: TabsProps) => {
  const [isActive, setIsActive] = useState(0);

  return (
    <div className="pt-24 flex flex-wrap justify-center w-full space-x-10">
      {header.map((headers: string, i: number) => (
        <button
          className={clsx(i === isActive ? "underline underline-offset-4 decoration-sky-500 decoration-2" : "")}
          key={i}
          onClick={() => setIsActive(i)}
        >
          {headers}
        </button>
      ))}

      <div className="w-full">
        <div>{body[isActive]}</div>
      </div>
    </div>
  );
};
