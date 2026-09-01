import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { ImageCategoryEnum } from "./enums.js";

/**
 * Property Gallery DTO & Schema
 */
export const PropertyGallerySchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    url: z.string().url(),
    publicId: z.string().trim().nullish(),
    category: ImageCategoryEnum,
    title: z.string().trim().max(200).nullish(),
    altText: z.string().trim().max(300).nullish(),
    isCover: z.boolean().default(false),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PropertyGalleryDto = z.infer<typeof PropertyGallerySchema>;
