import {
  pgTable,
  text,
  integer,
  varchar,
  timestamp,
  serial,
  boolean,
  uuid
} from "drizzle-orm/pg-core";
import { userTable } from "./userSchema";

export const rentalPropertyTable = pgTable("rental_properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date()),
  isFeatured: boolean("isFeatured").default(false),
  ownerId: uuid("ownerId")
    .references(() => userTable.id)
    .notNull(),
});
