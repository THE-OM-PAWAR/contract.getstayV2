import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import {
  ContentFaqSchema,
  ContentIndexabilitySchema,
  ContentSeoSchema,
} from "./common.contracts.js";
import { ContentStatusEnum } from "./enums.js";

/**
 * Locality Content DTO & Schema
 */
export const LocalityContentSchema = z
  .object({
    id: EntityIdSchema,
    localityId: EntityIdSchema,
    introduction: z.string().trim().max(1000).nullish(),
    description: z.string().trim().max(10000).nullish(),
    accommodationGuide: z.string().trim().max(10000).nullish(),
    whyStayHere: z.string().trim().max(5000).nullish(),
    popularPoiIds: z.array(EntityIdSchema).default([]),
    faqs: z.array(ContentFaqSchema).default([]),
    seo: ContentSeoSchema.default({}),
    indexability: ContentIndexabilitySchema.default({ indexable: true }),
    status: ContentStatusEnum.default("draft"),
    publishedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  })
  .merge(TimestampsSchema);

export type LocalityContentDto = z.infer<typeof LocalityContentSchema>;
