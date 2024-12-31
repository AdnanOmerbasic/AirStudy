"use server";

import { signIn } from "../../auth";
import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema/userSchema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { redirect } from "next/navigation";

interface State {
  values?: {
    email?: string;
    password?: string;
  };
  errors: {
    email?: string[];
    password?: string[];
    unexpectedErr?: string[];
  };
}

const credentialsSchema = z.object({
  email: z.string().email("Email or Password is incorrect"),
  password: z.string().min(8, "Email or password is incorrect"),
});

export async function signInCredentials(
  formState: State,
  formData: FormData
): Promise<State> {
  const valuesFromForm = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };

  const validateForm = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateForm.success) {
    return {
      values: valuesFromForm,
      errors: validateForm.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateForm.data;

  try {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return {
        errors: {
          email: ["Incorrect email or password"],
        },
        values: valuesFromForm,
      };
    }

    const passwordCheck = await compare(password, user.passwordHashed);
    if (!passwordCheck) {
      return {
        errors: {
          password: ["Incorrect email or password"],
        },
        values: valuesFromForm,
      };
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch {
    return {
      errors: {
        unexpectedErr: ["Could not sign you in. Please try again later."],
      },
      values: valuesFromForm,
    };
  }
  redirect("/");
}
