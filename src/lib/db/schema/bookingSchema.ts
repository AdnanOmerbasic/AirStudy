import { pgTable, serial, integer, date, text } from "drizzle-orm/pg-core";
import { rentalPropertyTable } from "./rentalSchema";
import { userTable } from "./userSchema";

export const bookingTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  status: text("status").default("pending").notNull(),
  rentalPropertyId: integer("rentalPropertyId")
    .references(() => rentalPropertyTable.id)
    .notNull(),
  userId: integer("userId")
    .references(() => userTable.id)
    .notNull(),
});
