"use server";

import { db } from "@/lib/db";
import { rentalPropertyTable } from "@/lib/db/schema/rentalSchema";
import { availabilityTable } from "@/lib/db/schema/availabilitySchema";
import { imageTable } from "@/lib/db/schema/imageSchema";
import { s3 } from "@/utils/aws3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteRental = async (rentalId: number) => {
  try {
    const images = await db
      .select({ urls: imageTable.images })
      .from(imageTable)
      .where(eq(imageTable.rentalPropertyId, rentalId));

    if (images.length) {
      const imageUrls = JSON.parse(images[0].urls) as string[];

      for (const imageUrl of imageUrls) {
        const fileKey = imageUrl.split("/").pop();
        if (fileKey) {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME!,
              Key: `images/${fileKey}`,
            })
          );
        }
      }
    }

    await db.transaction(async (tx) => {
      await tx
        .delete(availabilityTable)
        .where(eq(availabilityTable.rentalPropertyId, rentalId));
      await tx
        .delete(imageTable)
        .where(eq(imageTable.rentalPropertyId, rentalId));
      await tx
        .delete(rentalPropertyTable)
        .where(eq(rentalPropertyTable.id, rentalId));
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin-dashboard");
    revalidatePath("/stays/search");
  } catch {
    throw new Error("Failed to delete rental");
  }
};
