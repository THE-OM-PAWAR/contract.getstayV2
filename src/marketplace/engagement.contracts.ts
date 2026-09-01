import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";

/**
 * Favorite / Bookmark DTO & Schema
 */
export const FavoriteSchema = z
  .object({
    id: EntityIdSchema,
    userId: EntityIdSchema,
    propertyId: EntityIdSchema,
    roomPlanId: EntityIdSchema.nullish(),
    note: z.string().trim().max(300).nullish(),
  })
  .merge(TimestampsSchema);

export type FavoriteDto = z.infer<typeof FavoriteSchema>;

/**
 * Mutation schema to create/toggle a Favorite
 */
export const CreateFavoriteSchema = z.object({
  propertyId: EntityIdSchema,
  roomPlanId: EntityIdSchema.nullish(),
  note: z.string().trim().max(300).nullish(),
});
export type CreateFavoriteInput = z.infer<typeof CreateFavoriteSchema>;

/**
 * Recently Viewed Property DTO & Schema
 */
export const RecentlyViewedSchema = z.object({
  id: EntityIdSchema,
  userId: EntityIdSchema,
  propertyId: EntityIdSchema,
  viewedAt: z.union([z.string().datetime(), z.date()]),
  deviceType: z.string().trim().max(50).nullish(),
});
export type RecentlyViewedDto = z.infer<typeof RecentlyViewedSchema>;

/**
 * Mutation schema to record a property view
 */
export const RecordRecentlyViewedSchema = z.object({
  propertyId: EntityIdSchema,
  deviceType: z.string().trim().max(50).nullish(),
});
export type RecordRecentlyViewedInput = z.infer<
  typeof RecordRecentlyViewedSchema
>;

/**
 * Search History Item DTO & Schema
 */
export const SearchHistorySchema = z.object({
  id: EntityIdSchema,
  userId: EntityIdSchema,
  query: z.string().trim().min(1).max(200),
  cityId: EntityIdSchema.nullish(),
  filters: z.record(z.unknown()).nullish(),
  searchedAt: z.union([z.string().datetime(), z.date()]),
});
export type SearchHistoryDto = z.infer<typeof SearchHistorySchema>;

/**
 * Mutation schema to record a search query
 */
export const RecordSearchHistorySchema = z.object({
  query: z.string().trim().min(1).max(200),
  cityId: EntityIdSchema.nullish(),
  filters: z.record(z.unknown()).nullish(),
});
export type RecordSearchHistoryInput = z.infer<
  typeof RecordSearchHistorySchema
>;
