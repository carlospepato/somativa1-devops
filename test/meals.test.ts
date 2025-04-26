import { FastifyInstance } from 'fastify';
import { createServer } from '../src/server';
import { prisma } from '../src/lib/prisma';

describe('Meals Routes', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createServer();
  });

  beforeEach(async () => {
    await prisma.meal.deleteMany();
  });

  afterAll(async () => {
    await prisma.meal.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a new meal successfully', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/meals',
      payload: {
        food: 'Arroz com Feijão',
        period: 'LUNCH',
        grams: 300,
        calories: 400
      }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toMatchObject({
      food: 'Arroz com Feijão',
      period: 'LUNCH',
      grams: 300,
      calories: 400
    });
  });

  it('should return error 400 when trying to create meal with invalid data', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/meals',
      payload: {
        food: '',
        period: 'INVALID_PERIOD',
        grams: -100,
        calories: 0
      }
    });

    expect(response.statusCode).toBe(400);
  });

  it('should list all meals ordered by date', async () => {
    // Create some meals for testing
    await prisma.meal.createMany({
      data: [
        { food: 'Café', period: 'BREAKFAST', grams: 200, calories: 150 },
        { food: 'Almoço', period: 'LUNCH', grams: 500, calories: 800 }
      ]
    });

    const response = await app.inject({
      method: 'GET',
      url: '/meals'
    });

    expect(response.statusCode).toBe(200);
    const meals = JSON.parse(response.payload);
    expect(meals).toHaveLength(2);
    expect(meals[0].food).toBeDefined();
    expect(meals[1].food).toBeDefined();
  });

  it('should filter meals by period correctly', async () => {
    // Create meals of different periods
    await prisma.meal.createMany({
      data: [
        { food: 'Café', period: 'BREAKFAST', grams: 200, calories: 150 },
        { food: 'Almoço', period: 'LUNCH', grams: 500, calories: 800 },
        { food: 'Café da tarde', period: 'SNACK', grams: 150, calories: 200 }
      ]
    });

    const response = await app.inject({
      method: 'GET',
      url: '/meals/BREAKFAST'
    });

    expect(response.statusCode).toBe(200);
    const meals = JSON.parse(response.payload);
    expect(meals).toHaveLength(1);
    expect(meals[0].period).toBe('BREAKFAST');
  });

  it('should return error 400 when trying to filter by invalid period', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/meals/INVALID_PERIOD'
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.payload)).toHaveProperty('error', 'Invalid period');
  });
});