import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const locationConfigTable = pgTable("location_config", {
  locationId: text("location_id").primaryKey(),
  mapsUrl: text("maps_url"),
  writeReviewUrl: text("write_review_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertLocationConfigSchema = createInsertSchema(
  locationConfigTable,
).omit({ updatedAt: true });

export type InsertLocationConfig = z.infer<typeof insertLocationConfigSchema>;
export type LocationConfig = typeof locationConfigTable.$inferSelect;
