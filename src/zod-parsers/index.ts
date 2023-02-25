import { z } from 'zod'

const TranslationSchema = z.object({
  id: z.number(),
  from: z.string(),
  to: z.string(),
  notes: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const ZodSearchTranslationData = z.array(TranslationSchema).default([])

export const ZodTranslationData = z
  .object({
    data: z.array(TranslationSchema),
    total: z.number(),
    totalPages: z.number(),
    currentPage: z.string().transform((value) => parseInt(value, 10)),
  })
  .default({
    data: [],
    total: 0,
    totalPages: 0,
    currentPage: '1',
  })
