import { z } from "zod";
import {
  CityContentSchema,
  LocalityContentSchema,
  PointOfInterestContentSchema,
  PropertyContentSchema,
} from "../content/index.js";
import {
  AmenitySchema,
  CitySchema,
  LocalitySchema,
  PointOfInterestSchema,
  PropertyCategorySchema,
  PropertyTypeSchema,
} from "../master/index.js";
import {
  OrganisationSchema,
  PropertyGallerySchema,
  PropertyMealOfferingSchema,
  PropertyNearbyPlaceSchema,
  PropertySchema,
  RoomPlanSchema,
} from "../property/index.js";
import {
  PropertySearchCardSchema,
  SearchCardRatingSummarySchema,
} from "../search/index.js";

/**
 * Composite Public Property Page Read Payload
 */
export const PropertyDetailsSchema = z.object({
  property: PropertySchema,
  organisation: OrganisationSchema,
  propertyType: PropertyTypeSchema,
  categories: z.array(PropertyCategorySchema).default([]),
  amenities: z.array(AmenitySchema).default([]),
  roomPlans: z.array(RoomPlanSchema).default([]),
  galleries: z.array(PropertyGallerySchema).default([]),
  mealOfferings: z.array(PropertyMealOfferingSchema).default([]),
  nearbyPlaces: z.array(PropertyNearbyPlaceSchema).default([]),
  content: PropertyContentSchema.nullish(),
  ratingSummary: SearchCardRatingSummarySchema.default({
    averageRating: 0,
    totalReviews: 0,
  }),
});
export type PropertyDetailsDto = z.infer<typeof PropertyDetailsSchema>;

/**
 * Composite City Landing Page Read Payload
 */
export const CityLandingSchema = z.object({
  city: CitySchema,
  content: CityContentSchema.nullish(),
  popularLocalities: z.array(LocalitySchema).default([]),
  popularPropertyTypes: z.array(PropertyTypeSchema).default([]),
  featuredProperties: z.array(PropertySearchCardSchema).default([]),
});
export type CityLandingDto = z.infer<typeof CityLandingSchema>;

/**
 * Composite Locality Landing Page Read Payload
 */
export const LocalityLandingSchema = z.object({
  locality: LocalitySchema,
  city: CitySchema,
  content: LocalityContentSchema.nullish(),
  nearbyPOIs: z.array(PointOfInterestSchema).default([]),
  featuredProperties: z.array(PropertySearchCardSchema).default([]),
});
export type LocalityLandingDto = z.infer<typeof LocalityLandingSchema>;

/**
 * Composite Point Of Interest Landing Page Read Payload
 */
export const PointOfInterestLandingSchema = z.object({
  pointOfInterest: PointOfInterestSchema,
  locality: LocalitySchema,
  city: CitySchema,
  content: PointOfInterestContentSchema.nullish(),
  nearbyProperties: z.array(PropertySearchCardSchema).default([]),
});
export type PointOfInterestLandingDto = z.infer<
  typeof PointOfInterestLandingSchema
>;
