import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";

/**
 * Room Plan Photo Sub-schema
 */
export const RoomPlanPhotoSchema = z.object({
  url: z.string().url(),
  publicId: z.string().trim().nullish(),
  isCover: z.boolean().default(false),
  altText: z.string().trim().max(200).nullish(),
  displayOrder: z.number().int().nonnegative().default(0),
});
export type RoomPlanPhotoDto = z.infer<typeof RoomPlanPhotoSchema>;

/**
 * Room Plan DTO & Schema
 */
export const RoomPlanSchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    name: z.string().trim().min(1).max(100),
    slug: z.string().trim().toLowerCase().min(1),
    description: z.string().trim().max(1000).nullish(),
    occupancy: z.number().int().min(1).max(20),
    monthlyRent: z.number().min(0),
    isSecurityDepositApplicable: z.boolean().default(true),
    securityDeposit: z.number().min(0).default(0),
    photos: z.array(RoomPlanPhotoSchema).default([]),
    amenityIds: z.array(EntityIdSchema).default([]),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type RoomPlanDto = z.infer<typeof RoomPlanSchema>;
