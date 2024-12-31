import { text, integer, serial, pgTable, timestamp } from "drizzle-orm/pg-core";
import { rentalPropertyTable } from "./rentalSchema";

export const imageTable = pgTable("images", {
  id: serial("id").primaryKey(),
  images: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  rentalPropertyId: integer("rentalId")
    .references(() => rentalPropertyTable.id)
    .notNull(),
});
