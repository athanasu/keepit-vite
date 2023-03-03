import { z } from 'zod'

const TranslationSchema = z.object({
  id: z.number().transform((value) => value.toString()),
  from: z.string(),
  to: z.string(),
  notes: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const TranslationSchemaData = z.array(TranslationSchema)

export const ZodSearchTranslationData = TranslationSchemaData
export const ZodReadTranslationData = z
  .object({
    data: TranslationSchemaData,
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
