import { pgTable, serial, date, integer } from "drizzle-orm/pg-core";
import { rentalPropertyTable } from "./rentalSchema";

export const availabilityTable = pgTable("availability", {
  id: serial("id").primaryKey(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  rentalPropertyId: integer("rentalPropertyId")
    .references(() => rentalPropertyTable.id)
    .notNull(),
});
