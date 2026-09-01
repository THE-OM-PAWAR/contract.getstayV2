import { z } from "zod";

/**
 * Editorial content publishing lifecycle status enum
 */
export const ContentStatusEnum = z.enum(["draft", "published", "archived"]);
export type ContentStatus = z.infer<typeof ContentStatusEnum>;

/**
 * Editorial guide topic / classification category
 */
export const GuideCategoryEnum = z.enum([
  "accommodation",
  "city",
  "locality",
  "student",
  "moving",
  "comparison",
  "other",
]);
export type GuideCategory = z.infer<typeof GuideCategoryEnum>;
