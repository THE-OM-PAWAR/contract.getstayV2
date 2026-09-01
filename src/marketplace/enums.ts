import { z } from "zod";

/**
 * User gender identity enum
 */
export const UserGenderEnum = z.enum([
  "male",
  "female",
  "non_binary",
  "other",
  "prefer_not_to_say",
]);
export type UserGender = z.infer<typeof UserGenderEnum>;

/**
 * User occupation status
 */
export const UserOccupationEnum = z.enum(["student", "working_professional", "other"]);
export type UserOccupation = z.infer<typeof UserOccupationEnum>;

/**
 * Stay review moderation & display lifecycle status
 */
export const ReviewStatusEnum = z.enum(["pending", "approved", "rejected", "flagged"]);
export type ReviewStatus = z.infer<typeof ReviewStatusEnum>;

/**
 * User interaction / reaction type on reviews
 */
export const ReviewReactionTypeEnum = z.enum(["helpful", "unhelpful"]);
export type ReviewReactionType = z.infer<typeof ReviewReactionTypeEnum>;

/**
 * Marketplace enquiry / lead conversion lifecycle status
 */
export const EnquiryStatusEnum = z.enum([
  "new",
  "contacted",
  "visit_scheduled",
  "visited",
  "converted",
  "closed",
  "cancelled",
]);
export type EnquiryStatus = z.infer<typeof EnquiryStatusEnum>;

/**
 * Type / intent of marketplace customer enquiry
 */
export const EnquiryTypeEnum = z.enum([
  "general",
  "schedule_visit",
  "pricing_inquiry",
  "booking_request",
]);
export type EnquiryType = z.infer<typeof EnquiryTypeEnum>;

/**
 * User in-app / push notification domain category
 */
export const NotificationTypeEnum = z.enum([
  "enquiry_update",
  "review_moderation",
  "price_alert",
  "system_announcement",
  "promotional",
]);
export type NotificationType = z.infer<typeof NotificationTypeEnum>;
