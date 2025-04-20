import fastify from 'fastify'
import cors from '@fastify/cors'
import { mealsRoutes } from './routes/meals'

const app = fastify()

app.register(cors)
app.register(mealsRoutes, { prefix: '/meals' })

app.listen({
  port: 3333,
}).then(() => {
  console.log('🚀 HTTP Server running on port 3333')
})