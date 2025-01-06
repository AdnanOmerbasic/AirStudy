"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { auth } from "../../../../auth";
import { userTable } from "../schema/userSchema";

export async function GetAllAdmins() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const adminUsers = await db
    .select()
    .from(userTable).where(eq(userTable.isAdmin, true))

  return adminUsers;
}
