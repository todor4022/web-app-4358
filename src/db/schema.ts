import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});

export const transactions = sqliteTable("transactions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: text("date").notNull(),
    amount: real("amount").notNull(),
    beneficiary: text("beneficiary").notNull(),
    type: text("type").notNull(), // e.g., "Card Payment", "Online Transfer"
    status: text("status", { enum: ["sent", "received", "payed"] }).notNull().default("sent"),
    senderId: integer("sender_id").references(() => users.id),
});
