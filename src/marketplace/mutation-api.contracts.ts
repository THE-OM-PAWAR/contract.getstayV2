import { z } from "zod";
import { EntityIdSchema } from "../common/entity.types.js";
import { CreateFavoriteSchema } from "./engagement.contracts.js";
import {
  CreateEnquirySchema,
  UpdateEnquiryStatusSchema,
} from "./enquiry.contracts.js";
import {
  UpdateUserPreferencesSchema,
  UpdateUserProfileSchema,
} from "./identity.contracts.js";
import { MarkNotificationReadSchema } from "./notification.contracts.js";
import {
  CreateReviewSchema,
  ModerateReviewSchema,
  SetReviewReactionSchema,
} from "./review.contracts.js";

/**
 * Mutation API Request Types
 */
export const CreateReviewRequestSchema = CreateReviewSchema;
export type CreateReviewRequest = z.infer<typeof CreateReviewRequestSchema>;

export const UpdateReviewRequestSchema = CreateReviewSchema.partial();
export type UpdateReviewRequest = z.infer<typeof UpdateReviewRequestSchema>;

export const ModerateReviewRequestSchema = ModerateReviewSchema;
export type ModerateReviewRequest = z.infer<typeof ModerateReviewRequestSchema>;

export const CreateFavoriteRequestSchema = CreateFavoriteSchema;
export type CreateFavoriteRequest = z.infer<typeof CreateFavoriteRequestSchema>;

export const DeleteFavoriteRequestSchema = z.object({
  favoriteId: EntityIdSchema,
});
export type DeleteFavoriteRequest = z.infer<typeof DeleteFavoriteRequestSchema>;

export const CreateEnquiryRequestSchema = CreateEnquirySchema;
export type CreateEnquiryRequest = z.infer<typeof CreateEnquiryRequestSchema>;

export const UpdateEnquiryStatusRequestSchema = UpdateEnquiryStatusSchema;
export type UpdateEnquiryStatusRequest = z.infer<
  typeof UpdateEnquiryStatusRequestSchema
>;

export const UpdateUserProfileRequestSchema = UpdateUserProfileSchema;
export type UpdateUserProfileRequest = z.infer<
  typeof UpdateUserProfileRequestSchema
>;

export const UpdateUserPreferencesRequestSchema = UpdateUserPreferencesSchema;
export type UpdateUserPreferencesRequest = z.infer<
  typeof UpdateUserPreferencesRequestSchema
>;

export const SetReviewReactionRequestSchema = SetReviewReactionSchema;
export type SetReviewReactionRequest = z.infer<
  typeof SetReviewReactionRequestSchema
>;

export const MarkNotificationReadRequestSchema = MarkNotificationReadSchema;
export type MarkNotificationReadRequest = z.infer<
  typeof MarkNotificationReadRequestSchema
>;
