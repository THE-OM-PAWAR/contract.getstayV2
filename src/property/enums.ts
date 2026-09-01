import { z } from "zod";

/**
 * Organisation structure type enum
 */
export const OrganisationTypeEnum = z.enum(["individual", "business", "company"]);
export type OrganisationType = z.infer<typeof OrganisationTypeEnum>;

/**
 * KYC / verification status enum
 */
export const VerificationStatusEnum = z.enum(["unverified", "pending", "verified", "rejected"]);
export type VerificationStatus = z.infer<typeof VerificationStatusEnum>;

/**
 * Listing publishing lifecycle status enum
 */
export const PublishingStatusEnum = z.enum([
  "draft",
  "ready_for_review",
  "published",
  "unpublished",
]);
export type PublishingStatus = z.infer<typeof PublishingStatusEnum>;

/**
 * Acceptable government / identity document types
 */
export const DocumentTypeEnum = z.enum([
  "aadhaar",
  "pan",
  "passport",
  "driving_license",
  "voter_id",
]);
export type DocumentType = z.infer<typeof DocumentTypeEnum>;

/**
 * Categorization for gallery & property photos
 */
export const ImageCategoryEnum = z.enum([
  "exterior",
  "room",
  "bathroom",
  "mess",
  "reception",
  "common_area",
  "building",
  "other",
]);
export type ImageCategory = z.infer<typeof ImageCategoryEnum>;

/**
 * Meal frequency schedule enum
 */
export const MealFrequencyEnum = z.enum(["daily", "weekdays", "weekends", "optional"]);
export type MealFrequency = z.infer<typeof MealFrequencyEnum>;

/**
 * Travel and transit mode for proximity metrics
 */
export const TravelModeEnum = z.enum(["DRIVE", "WALK", "TWO_WHEELER", "BICYCLE", "TRANSIT"]);
export type TravelMode = z.infer<typeof TravelModeEnum>;
