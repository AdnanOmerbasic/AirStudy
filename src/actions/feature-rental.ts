"use server";

import { db } from "@/lib/db";
import { rentalPropertyTable } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function featureRental(id: number) {
  try {
    await db
      .update(rentalPropertyTable)
      .set({ isFeatured: true })
      .where(eq(rentalPropertyTable.id, id));
  } catch {
    throw new Error(`Error could not feature rental with ${id}`);
  }
  revalidatePath("/admin-dashboard");
  revalidatePath("/");
}
