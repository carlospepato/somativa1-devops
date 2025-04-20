import { z } from 'zod'

export const createMealSchema = z.object({
  food: z.string(),
  period: z.enum(['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER']),
  grams: z.number().positive(),
  calories: z.number().positive(),
})

export type CreateMealInput = z.infer<typeof createMealSchema>