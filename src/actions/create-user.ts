"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { userTable } from "@/lib/db/schema/userSchema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const createUserSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    isAdmin: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface State {
  values?: {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  errors: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    unexpectedErr?: string[];
  };
}

export async function createUser(
  formState: State,
  formData: FormData
): Promise<State> {
  const valuesFromForm = {
    fullName: formData.get("fullName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };

  const validateForm = createUserSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    isAdmin: formData.get("isAdmin") === "true",
  });

  if (!validateForm.success) {
    return {
      values: valuesFromForm,
      errors: validateForm.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, password, confirmPassword, isAdmin } = validateForm.data;

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ["Passwords do not match"],
      },
      values: valuesFromForm,
    };
  }

  try {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (user) {
      return {
        errors: {
          email: ["Email already exist. Please use another one."],
        },
        values: valuesFromForm,
      };
    }

    const passwordHashed = await hash(password, 10);

    await db.insert(userTable).values({
      fullName,
      email,
      passwordHashed,
      isAdmin
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          unexpectedErr: [err.message],
        },
        values: valuesFromForm,
      };
    } else {
      return {
        errors: {
          unexpectedErr: ["Error your user could not be created"],
        },
        values: valuesFromForm,
      };
    }
  }
  redirect("/sign-in");
}
