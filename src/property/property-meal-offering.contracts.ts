import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { MealFrequencyEnum } from "./enums.js";

/**
 * Property Meal Offering DTO & Schema
 */
export const PropertyMealOfferingSchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    mealTypeId: EntityIdSchema,
    included: z.boolean().default(false),
    price: z.number().min(0).nullish(),
    frequency: MealFrequencyEnum.default("daily"),
    description: z.string().trim().max(500).nullish(),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PropertyMealOfferingDto = z.infer<typeof PropertyMealOfferingSchema>;
