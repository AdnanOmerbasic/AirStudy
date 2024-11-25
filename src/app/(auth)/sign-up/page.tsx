"use client";
import { Button } from "@/components/Button/button";
import { Input } from "@/components/Input/input";
import { GmailIcon } from "@/icons/gmail-icon/gmail";
import { ShowPasswordIcon } from "@/icons/show-pass-icon/show-password-icon";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const err = "hejej";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex relative mx-auto justify-center items-center pt-5">
      <div className="absolute hidden lg:block">
        <img
          alt="Student Apartment"
          src="/img/apartmentstudent.jpg"
          className="max-w-md w-full rounded-3xl h-[600px] object-cover mr-24"
        />
      </div>
      <div className="bg-white max-w-md rounded-3xl w-full z-10 h-[570px] lg:translate-x-20 shadow-md">
        <h1 className="text-2xl font-bold flex items-center justify-center pt-8">
          Sign up for AirStudy
        </h1>
        <form className="pt-6 flex-col items-center pl-20 w-72 space-y-2">
          <Input
            isInvalid={false}
            errMsg={err}
            label="Fullname"
            type="text"
            placeholder="Enter your fullname"
          />
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
          <Input
            isInvalid={false}
            errMsg={err}
            label="Confirm password"
            placeholder="Enter your password"
            type={showConfirmPassword ? "text" : "password"}
            icon={
              <ShowPasswordIcon
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
          <div className="pt-2 pb-2">
            <select className="bg-gray-50 border border-black px-4 py-2 w-72 rounded-2xl">
              <option>Student</option>
              <option>Landlord</option>
            </select>
          </div>
          <div className="flex justify-end w-72">
            <Link
              href="/sign-in"
              className="text-gray-500 text-xs -mt-2 underline underline-offset-2"
            >
              Already have an account?
            </Link>
          </div>
          <div className="flex justify-end w-72 pb-2 pt-2">
            <Button size="md" className="text-sm">
              Sign up
            </Button>
          </div>
          <hr className="flex justify-center w-72" />
          <div className="flex justify-center w-72 pt-2">
            <Button size="sm" variant="secondary">
              <GmailIcon className="pr-2" />
              Sign up with Gmail
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
