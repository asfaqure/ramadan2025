import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  role: text("role", { enum: ["hosting", "attending"] }).notNull(),
  date: text("date").notNull(),
  guestCount: integer("guest_count").notNull(),
  notes: text("notes"),
});

export const insertReservationSchema = createInsertSchema(reservations).pick({
  name: true,
  email: true,
  phone: true,
  role: true,
  date: true,
  guestCount: true,
  notes: true,
}).extend({
  email: z.string().email().optional(),
  phone: z.string().min(8).max(15),
  guestCount: z.number().min(1).max(10),
});

export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservations.$inferSelect;
