import { z } from "zod";
import { PaginationMetaSchema } from "../common/api.types.js";
import { EntityIdSchema } from "../common/entity.types.js";
import { SearchSortOptionEnum } from "./enums.js";
import { PropertySearchCardSchema } from "./search-card.contracts.js";
import { SearchFiltersSchema } from "./search-filters.contracts.js";

/**
 * Standard Search Request DTO & Schema
 */
export const SearchRequestSchema = z.object({
  query: z.string().trim().optional(),
  filters: SearchFiltersSchema.optional().default({}),
  sortBy: SearchSortOptionEnum.default("relevance"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export type SearchRequestDto = z.infer<typeof SearchRequestSchema>;

/**
 * Generic Facet Item Structure
 */
export const FacetItemSchema = z.object({
  id: EntityIdSchema,
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  count: z.number().int().nonnegative(),
});
export type FacetItemDto = z.infer<typeof FacetItemSchema>;

/**
 * Price Range Facet
 */
export const PriceFacetRangeSchema = z.object({
  min: z.number().nonnegative(),
  max: z.number().nonnegative(),
});
export type PriceFacetRangeDto = z.infer<typeof PriceFacetRangeSchema>;

/**
 * Aggregated Search Facets for marketplace filter panels
 */
export const SearchFacetsSchema = z.object({
  localities: z.array(FacetItemSchema).default([]),
  propertyTypes: z.array(FacetItemSchema).default([]),
  categories: z.array(FacetItemSchema).default([]),
  amenities: z.array(FacetItemSchema).default([]),
  priceRange: PriceFacetRangeSchema.default({ min: 0, max: 0 }),
});

export type SearchFacetsDto = z.infer<typeof SearchFacetsSchema>;

/**
 * Complete Search Response Payload
 */
export const SearchResultSchema = z.object({
  query: z.string().optional(),
  items: z.array(PropertySearchCardSchema),
  facets: SearchFacetsSchema,
  pagination: PaginationMetaSchema,
});

export type SearchResultDto = z.infer<typeof SearchResultSchema>;
