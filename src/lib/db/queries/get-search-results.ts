"use server";

import { db } from "@/lib/db";
import {
  rentalPropertyTable,
  availabilityTable,
  imageTable,
} from "@/lib/db/schema/schema";
import { and, gte, lte, eq, or, ilike } from "drizzle-orm";

export async function searchRentals(
  location: string,
  dateFrom: string,
  dateTo: string
) {
  const conditions = [];

  if (location) {
    conditions.push(
      or(
        ilike(rentalPropertyTable.country, `%${location}%`),
        ilike(rentalPropertyTable.city, `%${location}%`)
      )
    );
  }
  if (dateFrom) {
    conditions.push(
      gte(availabilityTable.startDate, new Date(dateFrom).toISOString())
    );
  }
  if (dateTo) {
    conditions.push(
      lte(availabilityTable.endDate, new Date(dateTo).toISOString())
    );
  }

  const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

  const results = await db
    .select({
      id: rentalPropertyTable.id,
      title: rentalPropertyTable.title,
      description: rentalPropertyTable.description,
      country: rentalPropertyTable.country,
      city: rentalPropertyTable.city,
      dateFrom: availabilityTable.startDate,
      dateTo: availabilityTable.endDate,
      imageUrl: imageTable.images,
    })
    .from(rentalPropertyTable)
    .innerJoin(
      availabilityTable,
      eq(rentalPropertyTable.id, availabilityTable.rentalPropertyId)
    )
    .leftJoin(
      imageTable,
      eq(rentalPropertyTable.id, imageTable.rentalPropertyId)
    )
    .where(whereCondition)
    .groupBy(
      rentalPropertyTable.id,
      rentalPropertyTable.title,
      rentalPropertyTable.description,
      rentalPropertyTable.country,
      rentalPropertyTable.city,
      availabilityTable.startDate,
      availabilityTable.endDate,
      imageTable.images,
      imageTable.id
    )

  return results;
}
