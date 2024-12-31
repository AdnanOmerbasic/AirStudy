"use client";
import { Button } from "./button";
import { logOut } from "@/actions/log-out";

export const ButtonSignOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      onClick={async () => {
        await logOut();
      }}
    >
      {children}
    </Button>
  );
};
