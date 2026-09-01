import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { LocalityTypeEnum } from "./enums.js";

/**
 * Standard Coordinate Pair
 */
export const GeoCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
export type GeoCoordinatesDto = z.infer<typeof GeoCoordinatesSchema>;

/**
 * Country DTO & Schema
 */
export const CountrySchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    isoCode: z.string().trim().toUpperCase().length(2),
    phoneCode: z.string().trim().min(1),
    currency: z.string().trim().toUpperCase().min(1),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type CountryDto = z.infer<typeof CountrySchema>;

/**
 * State DTO & Schema
 */
export const StateSchema = z
  .object({
    id: EntityIdSchema,
    countryId: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    code: z.string().trim().toUpperCase().min(1),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type StateDto = z.infer<typeof StateSchema>;

/**
 * City DTO & Schema
 */
export const CitySchema = z
  .object({
    id: EntityIdSchema,
    stateId: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    heroImage: z.string().url().nullish(),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type CityDto = z.infer<typeof CitySchema>;

/**
 * Locality DTO & Schema
 */
export const LocalitySchema = z
  .object({
    id: EntityIdSchema,
    cityId: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    pincode: z.string().regex(/^\d{6}$/, "Invalid 6-digit Indian pincode"),
    localityType: LocalityTypeEnum,
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type LocalityDto = z.infer<typeof LocalitySchema>;

/**
 * Point Of Interest Type DTO & Schema
 */
export const PointOfInterestTypeSchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    icon: z.string().trim().nullish(),
    displayOrder: z.number().int().nonnegative().default(0),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PointOfInterestTypeDto = z.infer<typeof PointOfInterestTypeSchema>;

/**
 * Point Of Interest DTO & Schema
 */
export const PointOfInterestSchema = z
  .object({
    id: EntityIdSchema,
    cityId: EntityIdSchema,
    localityId: EntityIdSchema,
    typeId: EntityIdSchema,
    name: z.string().trim().min(1),
    slug: z.string().trim().toLowerCase().min(1),
    address: z.string().trim().min(1),
    website: z.string().url().nullish(),
    isPopular: z.boolean().default(false),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type PointOfInterestDto = z.infer<typeof PointOfInterestSchema>;
