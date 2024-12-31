import {
  PgTable,
  text,
  integer,
  varchar,
  pgTable,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { userTable } from "./userSchema";

export const rentalPropertyTable = pgTable("rental_properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
  ownerId: integer("ownerId")
    .references(() => userTable.id)
    .notNull(),
});
