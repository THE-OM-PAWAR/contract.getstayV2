import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { EnquiryStatusEnum, EnquiryTypeEnum } from "./enums.js";

/**
 * Enquiry DTO & Schema
 */
export const EnquirySchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    roomPlanId: EntityIdSchema.nullish(),
    userId: EntityIdSchema.nullish(),
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().toLowerCase(),
    phone: z
      .string()
      .trim()
      .regex(/^(\+91|91)?[6-9]\d{9}$/, "Invalid Indian phone number"),
    enquiryType: EnquiryTypeEnum.default("general"),
    expectedMoveInDate: z.union([z.string().datetime(), z.date()]).nullish(),
    scheduledVisitDate: z.union([z.string().datetime(), z.date()]).nullish(),
    message: z.string().trim().max(2000).nullish(),
    status: EnquiryStatusEnum.default("new"),
    hostNotes: z.string().trim().max(1000).nullish(),
  })
  .merge(TimestampsSchema);

export type EnquiryDto = z.infer<typeof EnquirySchema>;

/**
 * Mutation schema for submitting a new Customer Enquiry / Visit Schedule
 */
export const CreateEnquirySchema = z.object({
  propertyId: EntityIdSchema,
  roomPlanId: EntityIdSchema.nullish(),
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91|91)?[6-9]\d{9}$/, "Valid 10-digit Indian phone number is required"),
  enquiryType: EnquiryTypeEnum.default("general"),
  expectedMoveInDate: z.union([z.string().datetime(), z.date()]).optional(),
  scheduledVisitDate: z.union([z.string().datetime(), z.date()]).optional(),
  message: z.string().trim().max(2000).optional(),
});
export type CreateEnquiryInput = z.infer<typeof CreateEnquirySchema>;

/**
 * Mutation schema for Host / Operations status progression
 */
export const UpdateEnquiryStatusSchema = z.object({
  status: EnquiryStatusEnum,
  hostNotes: z.string().trim().max(1000).nullish(),
  scheduledVisitDate: z.union([z.string().datetime(), z.date()]).nullish(),
});
export type UpdateEnquiryStatusInput = z.infer<
  typeof UpdateEnquiryStatusSchema
>;
