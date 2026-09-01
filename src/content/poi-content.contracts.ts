import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import {
  ContentFaqSchema,
  ContentIndexabilitySchema,
  ContentSeoSchema,
} from "./common.contracts.js";
import { ContentStatusEnum } from "./enums.js";

/**
 * Point Of Interest Content DTO & Schema
 */
export const PointOfInterestContentSchema = z
  .object({
    id: EntityIdSchema,
    pointOfInterestId: EntityIdSchema,
    introduction: z.string().trim().max(1000).nullish(),
    description: z.string().trim().max(10000).nullish(),
    accommodationGuide: z.string().trim().max(10000).nullish(),
    faqs: z.array(ContentFaqSchema).default([]),
    seo: ContentSeoSchema.default({}),
    indexability: ContentIndexabilitySchema.default({ indexable: true }),
    status: ContentStatusEnum.default("draft"),
    publishedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  })
  .merge(TimestampsSchema);

export type PointOfInterestContentDto = z.infer<typeof PointOfInterestContentSchema>;
