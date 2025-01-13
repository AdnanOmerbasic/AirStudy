"use server";
import { db } from "@/lib/db";
import { rentalPropertyTable, availabilityTable } from "@/lib/db/schema/schema";
import { z } from "zod";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { imageTable } from "@/lib/db/schema/imageSchema";
import { s3 } from "@/utils/aws3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ConvertFileToBuffer } from "@/utils/convertFile";

const createRentalSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 2 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    country: z.string().min(2, "Invalid country"),
    city: z.string().min(1, "Invalid city"),
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
  values?: {
    title?: string;
    description?: string;
    country?: string;
    city?: string;
    address?: string;
    price?: number;
  };
  errors: {
    title?: string[];
    description?: string[];
    country?: string[];
    city?: string[];
    address?: string[];
    price?: string[];
    images?: string[];
    startDate?: string[];
    endDate?: string[];
    unexpectedErr?: string[];
  };
}

export async function createRental(
  formState: State,
  formData: FormData
): Promise<State> {
  const valuesFromForm = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    country: formData.get("country")?.toString(),
    city: formData.get("city")?.toString(),
    address: formData.get("address")?.toString(),
    price: Number(formData.get("price")?.toString()),
  };

  const validateForm = createRentalSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    country: formData.get("country"),
    city: formData.get("city"),
    address: formData.get("address"),
    price: Number(formData.get("price")),
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
  });

  if (!validateForm.success) {
    return {
      values: valuesFromForm,
      errors: validateForm.error.flatten().fieldErrors,
    };
  }

  const images = formData.getAll("file") as File[];
  if (!images.length || images.length === 0) {
    return {
      errors: {
        images: ["No images uploaded"],
      },
      values: valuesFromForm,
    };
  }

  const {
    title,
    description,
    country,
    city,
    address,
    price,
    startDate,
    endDate,
  } = validateForm.data;

  try {
    const session = await auth();
    const imageUploads: string[] = [];

    if (!session?.user?.id) {
      return {
        errors: {
          unexpectedErr: ["You must be logged in to create a rental property."],
        },
        values: valuesFromForm,
      };
    }
    await db.transaction(async (tx) => {
      const [newRentalProperty] = await tx
        .insert(rentalPropertyTable)
        .values({
          title,
          description,
          country,
          city,
          address,
          price,
          ownerId: Number(session?.user?.id),
        })
        .returning();

      await tx
        .insert(availabilityTable)
        .values({
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
          rentalPropertyId: newRentalProperty.id,
        })
        .returning();

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
        imageUploads.push(imageUrl);
      }

      await tx
        .insert(imageTable)
        .values({
          rentalPropertyId: newRentalProperty.id,
          images: JSON.stringify(imageUploads),
        })
        .returning();
    });
  } catch (err: unknown) {
    console.error("Transaction error:", err);
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
          unexpectedErr: [
            "Unexpected error, could not create a rental. Please try again later",
          ],
        },
      };
    }
  }
  revalidatePath("/dashboard");
  revalidatePath("/admin-dashboard");
  revalidatePath("/stays/search");
  redirect("/");
}
