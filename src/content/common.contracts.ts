import { z } from "zod";

/**
 * FAQ Sub-schema
 */
export const ContentFaqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required")
    .max(300, "Question cannot exceed 300 characters"),
  answer: z
    .string()
    .trim()
    .min(1, "Answer is required")
    .max(3000, "Answer cannot exceed 3000 characters"),
});
export type ContentFaqDto = z.infer<typeof ContentFaqSchema>;

/**
 * SEO & OpenGraph Metadata Sub-schema
 */
export const ContentSeoSchema = z.object({
  title: z.string().trim().max(100).nullish(),
  metaDescription: z.string().trim().max(300).nullish(),
  ogTitle: z.string().trim().max(100).nullish(),
  ogDescription: z.string().trim().max(300).nullish(),
  ogImage: z.string().url().nullish(),
});
export type ContentSeoDto = z.infer<typeof ContentSeoSchema>;

/**
 * Search Engine Indexability Sub-schema
 */
export const ContentIndexabilitySchema = z
  .object({
    indexable: z.boolean().default(true),
    noIndexReason: z.string().trim().max(300).nullish(),
  })
  .refine(
    (data) => {
      if (data.indexable === false) {
        return Boolean(data.noIndexReason && data.noIndexReason.trim().length >= 3);
      }
      return true;
    },
    {
      message: "Please provide a valid reason when indexable is false",
      path: ["noIndexReason"],
    }
  );
export type ContentIndexabilityDto = z.infer<typeof ContentIndexabilitySchema>;

/**
 * Guide Cover Image Sub-schema
 */
export const GuideCoverImageSchema = z.object({
  url: z.string().url("Valid cover image URL is required"),
  publicId: z.string().trim().nullish(),
  altText: z.string().trim().max(300).nullish(),
});
export type GuideCoverImageDto = z.infer<typeof GuideCoverImageSchema>;
