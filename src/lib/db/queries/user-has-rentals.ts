"use server";
import { eq } from "drizzle-orm";
import { db } from "..";
import { auth } from "../../../../auth";
import { rentalPropertyTable } from "../schema/rentalSchema";

export async function UserHasAtLeastOneRental() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const userRentals = await db
    .select()
    .from(rentalPropertyTable)
    .where(eq(rentalPropertyTable.ownerId, Number(session.user?.id)));

  return userRentals.length > 0;
}
