import { z } from "zod";

const decimalPrice = z.coerce
  .number({ error: "Must be a number" })
  .min(0, "Must be 0 or more")
  .refine((v) => Number.isInteger(Math.round(v * 100)), "Max 2 decimal places");

export const productSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    price: decimalPrice,
    discountedPrice: decimalPrice.optional(),
    taxIncluded: z.boolean().default(true),
    expirationStart: z.string().optional(),
    expirationEnd: z.string().optional(),
    stockQuantity: z.coerce.number().int().min(0).optional(),
    isUnlimited: z.boolean().default(false),
    stockStatus: z.enum(["IN_STOCK", "OUT_OF_STOCK"]).default("IN_STOCK"),
    isFeatured: z.boolean().default(false),
    colors: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
    categoryIds: z.array(z.string()).default([]),
    tagIds: z.array(z.string()).default([]),
  })
  .superRefine((data, ctx) => {
    if (!data.isUnlimited && data.stockQuantity === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stockQuantity"],
        message: "Required when not unlimited",
      });
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;

