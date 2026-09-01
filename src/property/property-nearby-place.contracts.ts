import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { TravelModeEnum } from "./enums.js";

/**
 * Distance Metrics Sub-schema (Canonical numeric values)
 */
export const DistanceMetricsSchema = z.object({
  straightLineMeters: z.number().min(0).nullish(),
  roadMeters: z.number().min(0).nullish(),
  durationSeconds: z.number().min(0).nullish(),
  travelMode: TravelModeEnum.default("DRIVE"),
  provider: z.string().trim().nullish(),
  calculatedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  isStale: z.boolean().default(false),
});
export type DistanceMetricsDto = z.infer<typeof DistanceMetricsSchema>;

/**
 * Property Nearby Place DTO & Schema
 */
export const PropertyNearbyPlaceSchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    pointOfInterestId: EntityIdSchema,
    distance: DistanceMetricsSchema,
    isPrimary: z.boolean().default(false),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PropertyNearbyPlaceDto = z.infer<typeof PropertyNearbyPlaceSchema>;
