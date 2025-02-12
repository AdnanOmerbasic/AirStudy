import { eq } from "drizzle-orm";
import { db } from "..";
import { auth } from "../../../../auth";
import { availabilityTable } from "../schema/availabilitySchema";
import { imageTable } from "../schema/imageSchema";
import { rentalPropertyTable } from "../schema/rentalSchema";

export async function GetUserRentals() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const rentalProperties = await db
    .select()
    .from(rentalPropertyTable)
    .leftJoin(
      availabilityTable,
      eq(availabilityTable.rentalPropertyId, rentalPropertyTable.id)
    )
    .leftJoin(
      imageTable,
      eq(imageTable.rentalPropertyId, rentalPropertyTable.id)
    )
    .where(eq(rentalPropertyTable.ownerId, session.user.id!));

  return rentalProperties;
}
