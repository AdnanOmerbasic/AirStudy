"use server";

import { db } from "@/lib/db";
import {
  rentalPropertyTable,
  availabilityTable,
  imageTable,
} from "@/lib/db/schema/schema";
import { z } from "zod";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { s3 } from "@/utils/aws3";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ConvertFileToBuffer } from "@/utils/convertFile";
import { eq } from "drizzle-orm";

const updateRentalSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 2 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    address: z.string().min(2, "Address must be at least 2 characters long"),
    price: z.number().min(100, "Price must be at least 100 eur"),
    startDate: z.date().refine((date) => date >= new Date(), {
      message: "Start date must be in the future",
    }),
    endDate: z.date(),
  })
  .refine(
    (data) => {
      const minimumDuration = 30 * 24 * 60 * 60 * 1000;
      return (
        data.endDate.getTime() - data.startDate.getTime() >= minimumDuration
      );
    },
    {
      message: "Property needs to be at least 30 days for rental",
      path: ["endDate"],
    }
  );

interface State {
  errors: {
    title?: string[];
    description?: string[];
    address?: string[];
    price?: string[];
    images?: string[];
    startDate?: string[];
    endDate?: string[];
    unexpectedErr?: string[];
  };
}

export async function updateRental(
  params: { id: string },
  formState: State,
  formData: FormData
): Promise<State> {
  const validateForm = updateRentalSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    address: formData.get("address"),
    price: Number(formData.get("price")),
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
  });

  if (!validateForm.success) {
    return {
      errors: validateForm.error.flatten().fieldErrors,
    };
  }

  const images = formData.getAll("file") as File[];

  const { title, description, address, price, startDate, endDate } =
    validateForm.data;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        errors: {
          unexpectedErr: [
            "You must be logged in to update your rental property",
          ],
        },
      };
    }

    await db.transaction(async (tx) => {
      const [existingRental] = await db
        .select()
        .from(rentalPropertyTable)
        .where(eq(rentalPropertyTable.id, Number(params.id)));

      if (
        !existingRental ||
        existingRental.ownerId !== Number(session.user.id)
      ) {
        throw new Error("No property found");
      }

      if (images.length > 0) {
        const [oldImages] = await db
          .select()
          .from(imageTable)
          .where(eq(imageTable.rentalPropertyId, Number(params.id)));

        if (oldImages && oldImages.images) {
          const urls = JSON.parse(oldImages.images) as string[];

          for (const imageUrl of urls) {
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
      }

      const newImageUploads: string[] = [];

      for (const image of images) {
        const fileBuffer = await ConvertFileToBuffer(image);
        const fileKey = `images/${Date.now()}-${image.name}`;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileKey,
          Body: fileBuffer,
          ContentType: image.type,
        };

        await s3.send(new PutObjectCommand(params));
        const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        newImageUploads.push(imageUrl);
      }

      await tx
        .update(rentalPropertyTable)
        .set({
          title,
          description,
          address,
          price,
        })
        .where(eq(rentalPropertyTable.id, Number(params.id)));

      await tx
        .update(availabilityTable)
        .set({
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        })
        .where(eq(availabilityTable.rentalPropertyId, Number(params.id)));

      await tx
        .update(imageTable)
        .set({
          images: JSON.stringify(newImageUploads),
        })
        .where(eq(imageTable.rentalPropertyId, Number(params.id)));
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          unexpectedErr: [err.message],
        },
      };
    } else {
      return {
        errors: {
          unexpectedErr: [
            "Unexpected error, could not update your rental. Please try again later",
          ],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  revalidatePath("/admin-dashboard");
  redirect("/dashboard");
}
