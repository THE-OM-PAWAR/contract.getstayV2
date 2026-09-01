import { z } from "zod";

/**
 * Standard Sort Order / Direction
 */
export const SortDirectionSchema = z.enum(["asc", "desc"]);
export type SortDirection = z.infer<typeof SortDirectionSchema>;

/**
 * Standard Pagination Query Schema
 */
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortOrder: SortDirectionSchema.default("desc"),
});
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

/**
 * Standard Pagination Metadata
 */
export const PaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

/**
 * Base API Error Interface
 */
export const ApiErrorDetailsSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
  details: z.unknown().optional(),
});
export type ApiErrorDetails = z.infer<typeof ApiErrorDetailsSchema>;

/**
 * Standard API Error Response
 */
export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  errors: z.array(ApiErrorDetailsSchema).optional(),
  timestamp: z.string().datetime().optional(),
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

/**
 * Generic API Single Item Response
 */
export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime().optional(),
  });
}

export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp?: string;
}

/**
 * Generic Paginated Response
 */
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    success: z.literal(true),
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime().optional(),
  });
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
  message?: string;
  timestamp?: string;
}
