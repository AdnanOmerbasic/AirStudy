"use client";
import { Button } from "@/components/Button/button";
import { Input } from "@/components/Input/input";
import { GmailIcon } from "@/icons/gmail-icon/gmail";
import { ShowPasswordIcon } from "@/icons/show-pass-icon/show-password-icon";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const err = "hejej";
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex relative mx-auto justify-center items-center pt-10">
      <div className="absolute translate-x-16">
        <img
          alt="Student Apartment"
          src="/img/apartmentstudent.jpg"
          className="max-w-md w-full rounded-3xl h-[600px] object-cover rounded-3x ml-20"
        />
      </div>
      <div className="bg-white max-w-md rounded-3xl w-full z-10 h-[500px] -translate-x-20 shadow-md">
        <h1 className="text-3xl font-bold flex items-center justify-center pt-12">
          Welcome back to AirStudy
        </h1>
        <form className="pt-10 flex-col items-center pl-20 w-72 space-y-4">
          <Input
            isInvalid={false}
            errMsg={err}
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            isInvalid={false}
            errMsg={err}
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            icon={
              <ShowPasswordIcon
                onClick={() => setShowPassword(!showPassword)}
              />
            }
          />
          <div className="flex justify-end w-72">
            <Link
              href="/sign-up"
              className="text-gray-500 text-xs -mt-2 underline underline-offset-2"
            >
              Don&apos;t have an account?
            </Link>
          </div>
          <div className="flex justify-end w-72 pb-5">
            <Button size="md" className="text-sm">
              Sign in
            </Button>
          </div>
          <hr className="flex justify-center w-72" />
          <div className="flex justify-center w-72 pt-4">
            <Button size="sm" variant="secondary">
              <GmailIcon className="pr-2" />
              Sign in with Gmail
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
