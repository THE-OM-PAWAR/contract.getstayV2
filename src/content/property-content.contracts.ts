import { z } from "zod";
import { EntityIdSchema, TimestampsSchema } from "../common/entity.types.js";
import {
  ContentFaqSchema,
  ContentIndexabilitySchema,
  ContentSeoSchema,
} from "./common.contracts.js";
import { ContentStatusEnum } from "./enums.js";

/**
 * Property Editorial & Marketing Content DTO & Schema
 */
export const PropertyContentSchema = z
  .object({
    id: EntityIdSchema,
    propertyId: EntityIdSchema,
    introduction: z.string().trim().max(1000).nullish(),
    description: z.string().trim().max(10000).nullish(),
    highlights: z.array(z.string().trim().max(300)).default([]),
    faqs: z.array(ContentFaqSchema).default([]),
    seo: ContentSeoSchema.default({}),
    indexability: ContentIndexabilitySchema.default({ indexable: true }),
    status: ContentStatusEnum.default("draft"),
    publishedAt: z.union([z.string().datetime(), z.date()]).nullish(),
  })
  .merge(TimestampsSchema);

export type PropertyContentDto = z.infer<typeof PropertyContentSchema>;
