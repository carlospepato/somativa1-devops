import { FastifyInstance } from 'fastify'
import { createMealSchema } from '../schemas/meal'
import { prisma } from '../lib/prisma'

export async function mealsRoutes(app: FastifyInstance) {
  // Criar uma nova refeição
  app.post('/', async (request, reply) => {
    const result = createMealSchema.safeParse(request.body)

    if (!result.success) {
      return reply.status(400).send({ errors: result.error.format() })
    }

    const meal = await prisma.meal.create({
      data: result.data
    })

    return reply.status(201).send(meal)
  })

  // Listar todas as refeições
  app.get('/', async () => {
    const meals = await prisma.meal.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return meals
  })

  // Listar refeições por período
  app.get('/:period', async (request, reply) => {
    const { period } = request.params as { period: string }
    
    if (!['BREAKFAST', 'LUNCH', 'SNACK', 'DINNER'].includes(period)) {
      return reply.status(400).send({ error: 'Invalid period' })
    }

    const meals = await prisma.meal.findMany({
      where: {
        period: period as any
      },
      orderBy: {
        date: 'desc'
      }
    })
    return meals
  })
}