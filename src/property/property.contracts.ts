import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import {
  DocumentTypeEnum,
  PublishingStatusEnum,
  VerificationStatusEnum,
} from "./enums.js";

/**
 * Property Physical Location Sub-schema
 */
export const PropertyLocationSchema = z.object({
  countryId: EntityIdSchema,
  stateId: EntityIdSchema,
  cityId: EntityIdSchema,
  localityId: EntityIdSchema,
  addressLine1: z.string().trim().min(1).max(200),
  addressLine2: z.string().trim().max(200).nullish(),
  landmark: z.string().trim().max(200).nullish(),
  pincode: z.string().regex(/^\d{6}$/, "Invalid 6-digit Indian pincode"),
  latitude: z.number().min(-90).max(90).nullish(),
  longitude: z.number().min(-180).max(180).nullish(),
  googleMapsUrl: z.string().url().nullish(),
});
export type PropertyLocationDto = z.infer<typeof PropertyLocationSchema>;

/**
 * Property Contact Sub-schema
 */
export const PropertyContactSchema = z.object({
  primaryPhone: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number"),
  secondaryPhone: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number")
    .nullish(),
  whatsapp: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number")
    .nullish(),
  email: z.string().trim().email().toLowerCase().nullish(),
});
export type PropertyContactDto = z.infer<typeof PropertyContactSchema>;

/**
 * Property Rules & Policies Sub-schema
 */
export const PropertyPoliciesSchema = z.object({
  gateClosingTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format")
    .nullish(),
  visitorsAllowed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  alcoholAllowed: z.boolean().default(false),
  outsideFoodAllowed: z.boolean().default(true),
  documentsRequired: z.array(DocumentTypeEnum).default([]),
  customNotes: z.string().trim().max(1000).nullish(),
});
export type PropertyPoliciesDto = z.infer<typeof PropertyPoliciesSchema>;

/**
 * Property Verification Status (Public representation without internal HQ reviewer info)
 */
export const PropertyVerificationSchema = z.object({
  status: VerificationStatusEnum.default("unverified"),
  verifiedAt: z.union([z.string().datetime(), z.date()]).nullish(),
});
export type PropertyVerificationDto = z.infer<typeof PropertyVerificationSchema>;

/**
 * Property Publishing State
 */
export const PropertyPublishingSchema = z.object({
  status: PublishingStatusEnum.default("draft"),
  publishedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  unpublishedAt: z.union([z.string().datetime(), z.date()]).nullish(),
});
export type PropertyPublishingDto = z.infer<typeof PropertyPublishingSchema>;

/**
 * Property DTO & Schema
 */
export const PropertySchema = z
  .object({
    id: EntityIdSchema,
    organisationId: EntityIdSchema,
    name: z.string().trim().min(1).max(200),
    slug: z.string().trim().toLowerCase().min(1),
    propertyTypeId: EntityIdSchema,
    categoryIds: z.array(EntityIdSchema).default([]),
    amenityIds: z.array(EntityIdSchema).default([]),
    location: PropertyLocationSchema,
    contact: PropertyContactSchema,
    policies: PropertyPoliciesSchema,
    verification: PropertyVerificationSchema,
    publishing: PropertyPublishingSchema,
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PropertyDto = z.infer<typeof PropertySchema>;
