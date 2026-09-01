import { z } from "zod";

/**
 * Locality classification enum
 */
export const LocalityTypeEnum = z.enum([
  "Residential",
  "Commercial",
  "Mixed",
  "Industrial",
  "Education",
  "IT Hub",
]);
export type LocalityType = z.infer<typeof LocalityTypeEnum>;

/**
 * Amenity domain category enum
 */
export const AmenityCategoryEnum = z.enum([
  "Room",
  "Bathroom",
  "Food",
  "Building",
  "Safety",
  "Utility",
  "Comfort",
  "Technology",
  "Recreation",
  "Services",
  "Outdoor",
  "Other",
]);
export type AmenityCategory = z.infer<typeof AmenityCategoryEnum>;
