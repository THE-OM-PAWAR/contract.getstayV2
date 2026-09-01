import { z } from "zod";
import { EntityIdSchema } from "../common/entity.types.js";

/**
 * Nearby landmark proximity summary on search card
 */
export const SearchCardNearbyDistanceSchema = z.object({
  poiId: EntityIdSchema,
  poiName: z.string().trim().min(1),
  distanceMeters: z.number().nonnegative(),
  durationMinutes: z.number().nonnegative().nullish(),
  travelMode: z.string().trim().nullish(),
});
export type SearchCardNearbyDistanceDto = z.infer<
  typeof SearchCardNearbyDistanceSchema
>;

/**
 * Rating & Review aggregation on search card
 */
export const SearchCardRatingSummarySchema = z.object({
  averageRating: z.number().min(0).max(5),
  totalReviews: z.number().int().nonnegative(),
});
export type SearchCardRatingSummaryDto = z.infer<
  typeof SearchCardRatingSummarySchema
>;

/**
 * High-performance, lightweight Property Search Card DTO & Schema
 * Designed specifically for marketplace search feeds and listing pages.
 */
export const PropertySearchCardSchema = z.object({
  id: EntityIdSchema,
  name: z.string().trim().min(1),
  slug: z.string().trim().toLowerCase().min(1),
  propertyTypeName: z.string().trim().min(1),
  categoryNames: z.array(z.string().trim()).default([]),
  coverImageUrl: z.string().url().nullish(),
  localityName: z.string().trim().min(1),
  cityName: z.string().trim().min(1),
  addressSummary: z.string().trim().min(1),
  startingPrice: z.number().nonnegative(),
  securityDeposit: z.number().nonnegative().nullish(),
  occupanciesAvailable: z.array(z.number().int().min(1)).default([]),
  highlightedAmenityNames: z.array(z.string().trim()).default([]),
  ratingSummary: SearchCardRatingSummarySchema.default({
    averageRating: 0,
    totalReviews: 0,
  }),
  nearbyTargetMetrics: SearchCardNearbyDistanceSchema.nullish(),
  isVerified: z.boolean().default(false),
  foodIncluded: z.boolean().default(false),
});

export type PropertySearchCardDto = z.infer<typeof PropertySearchCardSchema>;
