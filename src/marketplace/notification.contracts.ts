import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { NotificationTypeEnum } from "./enums.js";

/**
 * User Notification DTO & Schema
 */
export const NotificationSchema = z
  .object({
    id: EntityIdSchema,
    userId: EntityIdSchema,
    type: NotificationTypeEnum.default("system_announcement"),
    title: z.string().trim().min(1).max(200),
    message: z.string().trim().min(1).max(1000),
    link: z.string().trim().max(500).nullish(),
    isRead: z.boolean().default(false),
    readAt: z.union([z.string().datetime(), z.date()]).nullish(),
    metadata: z.record(z.unknown()).nullish(),
  })
  .merge(TimestampsSchema);

export type NotificationDto = z.infer<typeof NotificationSchema>;

/**
 * Mutation schema for marking a notification as read
 */
export const MarkNotificationReadSchema = z.object({
  notificationId: EntityIdSchema,
  isRead: z.boolean().default(true),
});
export type MarkNotificationReadInput = z.infer<
  typeof MarkNotificationReadSchema
>;
