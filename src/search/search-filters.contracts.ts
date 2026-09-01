import { z } from "zod";
import { EntityIdSchema } from "../common/entity.types.js";

/**
 * Filter facets applied during search & discovery queries
 */
export const SearchFiltersSchema = z.object({
  cityId: EntityIdSchema.optional(),
  localityIds: z.array(EntityIdSchema).optional(),
  propertyTypeIds: z.array(EntityIdSchema).optional(),
  categoryIds: z.array(EntityIdSchema).optional(),
  amenityIds: z.array(EntityIdSchema).optional(),
  occupancies: z.array(z.coerce.number().int().min(1).max(10)).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  foodIncluded: z.coerce.boolean().optional(),
  verifiedOnly: z.coerce.boolean().optional(),
  nearbyPoiId: EntityIdSchema.optional(),
  maxDistanceMeters: z.coerce.number().positive().optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
});

export type SearchFiltersDto = z.infer<typeof SearchFiltersSchema>;
