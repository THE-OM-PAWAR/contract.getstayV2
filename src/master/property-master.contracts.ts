import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { AmenityCategoryEnum } from "./enums.js";

/**
 * Property Type DTO & Schema (e.g., Hostel, PG, Co-living)
 */
export const PropertyTypeSchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    description: z.string().trim().nullish(),
    icon: z.string().trim().nullish(),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PropertyTypeDto = z.infer<typeof PropertyTypeSchema>;

/**
 * Property Category DTO & Schema (e.g., Boys, Girls, Co-ed, Students)
 */
export const PropertyCategorySchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    description: z.string().trim().nullish(),
    icon: z.string().trim().nullish(),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PropertyCategoryDto = z.infer<typeof PropertyCategorySchema>;

/**
 * Amenity DTO & Schema
 */
export const AmenitySchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    category: AmenityCategoryEnum,
    description: z.string().trim().nullish(),
    icon: z.string().trim().nullish(),
    isFilterable: z.boolean().default(false),
    isHighlighted: z.boolean().default(false),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type AmenityDto = z.infer<typeof AmenitySchema>;

/**
 * Meal Type DTO & Schema (e.g., Breakfast, Lunch, Dinner)
 */
export const MealTypeSchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    description: z.string().trim().nullish(),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type MealTypeDto = z.infer<typeof MealTypeSchema>;
