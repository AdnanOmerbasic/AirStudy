import { db } from "@/lib/db";
import {
  rentalPropertyTable,
  imageTable,
  availabilityTable,
} from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";

export async function GetFeaturedRentals() {
  const rentals = await db
    .select({
      id: rentalPropertyTable.id,
      title: rentalPropertyTable.title,
      description: rentalPropertyTable.description,
      city: rentalPropertyTable.city,
      country: rentalPropertyTable.country,
      imageUrl: imageTable.images,
      startDate: availabilityTable.startDate,
      endDate: availabilityTable.endDate,
    })
    .from(rentalPropertyTable)
    .leftJoin(
      imageTable,
      eq(imageTable.rentalPropertyId, rentalPropertyTable.id)
    )
    .leftJoin(
      availabilityTable,
      eq(availabilityTable.rentalPropertyId, rentalPropertyTable.id)
    )
    .where(eq(rentalPropertyTable.isFeatured, true));

  return rentals;
}
