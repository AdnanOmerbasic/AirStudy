"use server";

import { and, eq } from "drizzle-orm";
import { db } from "..";
import { rentalPropertyTable } from "../schema/schema";

export async function getRentalById(id: number, userId: string) {
  const [getById] = await db
    .select({ id: rentalPropertyTable.id })
    .from(rentalPropertyTable)
    .where(
      and(
        eq(rentalPropertyTable.id, id),
        eq(rentalPropertyTable.ownerId, userId)
      )
    );

  return getById || null;
}
