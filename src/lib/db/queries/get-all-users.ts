"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { auth } from "../../../../auth";
import { userTable } from "../schema/userSchema";

export async function GetAllUsers() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.isAdmin, false));

  return users;
}
