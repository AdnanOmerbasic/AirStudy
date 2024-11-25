import { pgTable, text, timestamp, serial, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: serial("userId").primaryKey(),
    fullName: text("fullName").notNull(),
    email: text("email").unique().notNull(),
    passwordHashed: text("password").notNull(),
    isAdmin: boolean("isAdmin").default(false),
    createdAt: timestamp("userCreated").defaultNow()
})