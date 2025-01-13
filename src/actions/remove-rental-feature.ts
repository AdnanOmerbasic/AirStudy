"use server";

import { db } from "@/lib/db";
import { rentalPropertyTable } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function removeRentalFeature(id: number) {
  try {
    await db
      .update(rentalPropertyTable)
      .set({ isFeatured: false })
      .where(eq(rentalPropertyTable.id, id));
  } catch {
    throw new Error(`Error could not remove rental with ${id} feature`);
  }
  revalidatePath("/admin-dashboard");
  revalidatePath("/");
}
    