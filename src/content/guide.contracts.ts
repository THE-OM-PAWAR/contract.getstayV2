import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import { ContentSeoSchema, GuideCoverImageSchema } from "./common.contracts.js";
import { ContentStatusEnum, GuideCategoryEnum } from "./enums.js";

/**
 * Editorial Guide DTO & Schema
 */
export const GuideSchema = z
  .object({
    id: EntityIdSchema,
    title: z.string().trim().min(3).max(200),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
    excerpt: z.string().trim().max(1000).nullish(),
    content: z.string().trim().min(10, "Guide content must be at least 10 characters"),
    coverImage: GuideCoverImageSchema.nullish(),
    category: GuideCategoryEnum.default("other"),
    relatedCityIds: z.array(EntityIdSchema).default([]),
    relatedLocalityIds: z.array(EntityIdSchema).default([]),
    relatedPoiIds: z.array(EntityIdSchema).default([]),
    relatedPropertyIds: z.array(EntityIdSchema).default([]),
    seo: ContentSeoSchema.default({}),
    status: ContentStatusEnum.default("draft"),
    publishedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  })
  .merge(TimestampsSchema);

export type GuideDto = z.infer<typeof GuideSchema>;
