import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { ReviewReactionTypeEnum, ReviewStatusEnum } from "./enums.js";

/**
 * Granular rating breakdown (1.0 to 5.0)
 */
export const ReviewRatingsSchema = z.object({
  overall: z.number().min(1).max(5),
  cleanliness: z.number().min(1).max(5).nullish(),
  food: z.number().min(1).max(5).nullish(),
  safety: z.number().min(1).max(5).nullish(),
  valueForMoney: z.number().min(1).max(5).nullish(),
});
export type ReviewRatingsDto = z.infer<typeof ReviewRatingsSchema>;

/**
 * Review Media Sub-schema
 */
export const ReviewMediaSchema = z.object({
  url: z.string().url("Valid media URL is required"),
  type: z.enum(["image", "video"]).default("image"),
  caption: z.string().trim().max(200).nullish(),
});
export type ReviewMediaDto = z.infer<typeof ReviewMediaSchema>;

/**
 * Public Review DTO & Schema
 */
export const ReviewSchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    userId: EntityIdSchema,
    userName: z.string().trim().min(1).max(100),
    userAvatarUrl: z.string().url().nullish(),
    stayDurationMonths: z.number().int().min(1).max(120).nullish(),
    roomPlanName: z.string().trim().max(100).nullish(),
    ratings: ReviewRatingsSchema,
    title: z.string().trim().max(200).nullish(),
    comment: z.string().trim().min(5).max(3000),
    pros: z.array(z.string().trim().max(200)).default([]),
    cons: z.array(z.string().trim().max(200)).default([]),
    media: z.array(ReviewMediaSchema).default([]),
    helpfulCount: z.number().int().nonnegative().default(0),
    status: ReviewStatusEnum.default("pending"),
    moderationReason: z.string().trim().max(500).nullish(),
    moderatedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  })
  .merge(TimestampsSchema);

export type ReviewDto = z.infer<typeof ReviewSchema>;

/**
 * Mutation schema for User Review Submission (Enters 'pending' moderation queue)
 */
export const CreateReviewSchema = z.object({
  propertyId: EntityIdSchema,
  stayDurationMonths: z.number().int().min(1).max(120).nullish(),
  roomPlanName: z.string().trim().max(100).nullish(),
  ratings: ReviewRatingsSchema,
  title: z.string().trim().max(200).nullish(),
  comment: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(3000, "Review cannot exceed 3000 characters"),
  pros: z.array(z.string().trim().max(200)).optional(),
  cons: z.array(z.string().trim().max(200)).optional(),
  media: z.array(ReviewMediaSchema).optional(),
});
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;

/**
 * Mutation schema for HQ Moderation Review Transition
 */
export const ModerateReviewSchema = z.object({
  status: z.enum(["approved", "rejected", "flagged"]),
  moderationReason: z.string().trim().max(500).nullish(),
});
export type ModerateReviewInput = z.infer<typeof ModerateReviewSchema>;

/**
 * Review Reaction DTO & Schema
 */
export const ReviewReactionSchema = z
  .object({
    id: EntityIdSchema,
    reviewId: EntityIdSchema,
    userId: EntityIdSchema,
    reactionType: ReviewReactionTypeEnum,
  })
  .merge(TimestampsSchema);

export type ReviewReactionDto = z.infer<typeof ReviewReactionSchema>;

/**
 * Mutation schema to toggle a review reaction
 */
export const SetReviewReactionSchema = z.object({
  reviewId: EntityIdSchema,
  reactionType: ReviewReactionTypeEnum,
});
export type SetReviewReactionInput = z.infer<typeof SetReviewReactionSchema>;
