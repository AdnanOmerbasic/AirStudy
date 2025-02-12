import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: text("fullName"),
    email: text("email").unique().notNull(),
    passwordHashed: text("password"),
    isAdmin: boolean("isAdmin").default(false),
    createdAt: timestamp("userCreated").defaultNow()
})