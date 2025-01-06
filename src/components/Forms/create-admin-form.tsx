"use client";
import { createUser } from "@/actions";
import { useActionState, useState } from "react";
import { Input } from "../ui/Input/input";
import { Button } from "../ui/Button/button";
import { ShowPasswordIcon } from "@/icons/show-pass-icon/show-password-icon";

export const AdminForm = () => {
  const [formState, action] = useActionState(createUser, {
    errors: {},
    values: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full h-full grid place-items-center pt-20">
      <div className="grid place-items-center md:max-w-4xl px-24 h-full rounded-2xl shadow-lg border-outlineGray border">
        <form
          action={action}
          className="grud grid-cols-1 p-8 place-items-center h-full space-y-4"
        >
          <h1 className="text-2xl text-center font-bold pt-4">
            Create an Admin
          </h1>
          <div>
            <Input
              isInvalid={!!formState.errors.fullName}
              errMsg={formState.errors.fullName?.join(" ") as string}
              label="Full name"
              type="text"
              name="fullName"
              placeholder="Enter your fullname"
              defaultValue={formState.values?.fullName}
            />
          </div>
          <div>
            <Input
              isInvalid={!!formState.errors.email}
              errMsg={formState.errors.email?.join(" ") as string}
              label="E-mail"
              type="text"
              name="email"
              placeholder="Enter your e-mail"
              defaultValue={formState.values?.email}
            />
          </div>
          <div>
            <Input
              isInvalid={!!formState.errors.password}
              errMsg={formState.errors.password?.join(" ") as string}
              label="Password"
              name="password"
              placeholder="Enter your password"
              defaultValue={formState.values?.password}
              type={showPassword ? "text" : "password"}
              icon={
                <ShowPasswordIcon
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
            />
          </div>
          <div>
            <Input
              isInvalid={!!formState.errors.confirmPassword}
              errMsg={formState.errors.confirmPassword?.join(" ") as string}
              label="Confirm password"
              name="confirmPassword"
              placeholder="Enter your password again"
              defaultValue={formState.values?.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              icon={
                <ShowPasswordIcon
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          </div>
          <div>
            <input hidden type="text" name="isAdmin" defaultValue="true" />
          </div>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
