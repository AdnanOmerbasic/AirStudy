import type { Metadata } from "next";
import { Logo } from "@/icons/logo/logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth",
  description: "Sign",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="pl-10 lg:pl-20 pt-5 flex items-center">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>
      </div>
      {children}
    </div>
  );
}
