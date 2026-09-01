import { z } from "zod";

/**
 * Supported sorting options for search & discovery listings
 */
export const SearchSortOptionEnum = z.enum([
  "relevance",
  "price_asc",
  "price_desc",
  "rating_desc",
  "distance_asc",
  "newest",
]);
export type SearchSortOption = z.infer<typeof SearchSortOptionEnum>;
