import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { UserGenderEnum, UserOccupationEnum } from "./enums.js";

/**
 * Public Marketplace User DTO & Schema
 * Never exposes passwords, password hashes, auth tokens, or private metadata.
 */
export const UserSchema = z
  .object({
    id: EntityIdSchema,
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().toLowerCase(),
    phone: z
      .string()
      .trim()
      .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number")
      .nullish(),
    avatarUrl: z.string().url().nullish(),
    isEmailVerified: z.boolean().default(false),
    isPhoneVerified: z.boolean().default(false),
    isActive: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type UserDto = z.infer<typeof UserSchema>;

/**
 * User Profile DTO & Schema
 */
export const UserProfileSchema = z
  .object({
    id: EntityIdSchema,
    userId: EntityIdSchema,
    bio: z.string().trim().max(500).nullish(),
    gender: UserGenderEnum.default("prefer_not_to_say"),
    occupation: UserOccupationEnum.default("student"),
    collegeOrCompany: z.string().trim().max(200).nullish(),
    homeCity: z.string().trim().max(100).nullish(),
    emergencyContactName: z.string().trim().max(100).nullish(),
    emergencyContactPhone: z
      .string()
      .trim()
      .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number")
      .nullish(),
  })
  .merge(TimestampsSchema);

export type UserProfileDto = z.infer<typeof UserProfileSchema>;

/**
 * Mutation schema for updating User Profile
 */
export const UpdateUserProfileSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  bio: z.string().trim().max(500).nullish(),
  gender: UserGenderEnum.optional(),
  occupation: UserOccupationEnum.optional(),
  collegeOrCompany: z.string().trim().max(200).nullish(),
  homeCity: z.string().trim().max(100).nullish(),
  avatarUrl: z.string().url().nullish(),
  emergencyContactName: z.string().trim().max(100).nullish(),
  emergencyContactPhone: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number")
    .nullish(),
});

export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;

/**
 * Marketplace User Stay Preferences DTO & Schema
 */
export const MarketplaceUserPreferencesSchema = z
  .object({
    id: EntityIdSchema,
    userId: EntityIdSchema,
    preferredCityId: EntityIdSchema.nullish(),
    budgetMin: z.number().min(0).nullish(),
    budgetMax: z.number().min(0).nullish(),
    preferredOccupancies: z.array(z.number().int().min(1).max(10)).default([]),
    preferredCategoryIds: z.array(EntityIdSchema).default([]),
    preferredAmenityIds: z.array(EntityIdSchema).default([]),
    needFoodIncluded: z.boolean().default(false),
    emailNotifications: z.boolean().default(true),
    whatsappNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(true),
  })
  .merge(TimestampsSchema);

export type MarketplaceUserPreferencesDto = z.infer<
  typeof MarketplaceUserPreferencesSchema
>;

/**
 * Mutation schema for updating User Stay Preferences
 */
export const UpdateUserPreferencesSchema = z.object({
  preferredCityId: EntityIdSchema.nullish(),
  budgetMin: z.number().min(0).nullish(),
  budgetMax: z.number().min(0).nullish(),
  preferredOccupancies: z.array(z.number().int().min(1).max(10)).optional(),
  preferredCategoryIds: z.array(EntityIdSchema).optional(),
  preferredAmenityIds: z.array(EntityIdSchema).optional(),
  needFoodIncluded: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
  whatsappNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
});

export type UpdateUserPreferencesInput = z.infer<
  typeof UpdateUserPreferencesSchema
>;
