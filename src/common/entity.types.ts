import { z } from "zod";

/**
 * Standard Unique Identifier Schema (string-based ID agnostic to DB driver)
 */
export const EntityIdSchema = z.string().min(1);
export type EntityId = z.infer<typeof EntityIdSchema>;

/**
 * Common Audit Timestamp schema
 */
export const TimestampsSchema = z.object({
  createdAt: z.union([z.string().datetime(), z.date()]),
  updatedAt: z.union([z.string().datetime(), z.date()]),
});
export type Timestamps = z.infer<typeof TimestampsSchema>;

/**
 * Soft Deletable schema mixin
 */
export const SoftDeletableSchema = z.object({
  isDeleted: z.boolean().default(false),
  deletedAt: z.union([z.string().datetime(), z.date()]).nullish(),
});
export type SoftDeletable = z.infer<typeof SoftDeletableSchema>;

/**
 * Common Status types
 */
export const ActiveStatusSchema = z.enum(["active", "inactive", "archived", "draft"]);
export type ActiveStatus = z.infer<typeof ActiveStatusSchema>;
