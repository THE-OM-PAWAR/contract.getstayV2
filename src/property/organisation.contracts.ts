import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { OrganisationTypeEnum, VerificationStatusEnum } from "./enums.js";

/**
 * Organisation Contact DTO & Schema
 */
export const OrganisationContactSchema = z.object({
  personName: z.string().trim().min(1).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number"),
  alternatePhone: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number")
    .nullish(),
  email: z.string().trim().email().toLowerCase().nullish(),
});
export type OrganisationContactDto = z.infer<typeof OrganisationContactSchema>;

/**
 * Organisation Address DTO & Schema
 */
export const OrganisationAddressSchema = z.object({
  addressLine1: z.string().trim().min(1).max(200),
  addressLine2: z.string().trim().max(200).nullish(),
  cityId: EntityIdSchema,
  stateId: EntityIdSchema,
  countryId: EntityIdSchema,
  pincode: z.string().regex(/^\d{6}$/, "Invalid 6-digit Indian pincode"),
});
export type OrganisationAddressDto = z.infer<typeof OrganisationAddressSchema>;

/**
 * Public Organisation DTO & Schema (for Marketplace display & host profiles)
 * Excludes internal HQ-only notes and admin metadata.
 */
export const OrganisationSchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1).max(200),
    slug: z.string().trim().toLowerCase().min(1),
    legalName: z.string().trim().max(300).nullish(),
    organisationType: OrganisationTypeEnum.default("business"),
    contact: OrganisationContactSchema,
    address: OrganisationAddressSchema,
    verificationStatus: VerificationStatusEnum.default("unverified"),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type OrganisationDto = z.infer<typeof OrganisationSchema>;
