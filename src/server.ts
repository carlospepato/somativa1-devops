import fastify from 'fastify'
import cors from '@fastify/cors'
import { mealsRoutes } from './routes/meals'

export async function createServer() {
  const app = fastify()

  app.register(cors)
  app.register(mealsRoutes, { prefix: '/meals' })

  return app
}

if (process.env.NODE_ENV !== 'test') {
  createServer().then(app => {
    app.listen({
      port: 3333,
      host: '0.0.0.0',
    }).then(() => {
      console.log('🚀 HTTP Server running on port 3333')
    })
  })
}