const request = require('supertest');
const app = require('../src/index');

describe('Calculator API Integration Tests', () => {

  // ─── Health Check ───────────────────────────────────────
  describe('GET /health', () => {
    test('returns 200 and status OK', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
    });
  });

  // ─── POST /calculate ────────────────────────────────────
  describe('POST /calculate', () => {
    test('addition: 5 + 3 = 8', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 5, b: 3, operation: 'add' });
      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(8);
    });

    test('subtraction: 10 - 4 = 6', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 10, b: 4, operation: 'subtract' });
      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(6);
    });

    test('multiplication: 3 × 4 = 12', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 3, b: 4, operation: 'multiply' });
      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(12);
    });

    test('division: 10 ÷ 2 = 5', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 10, b: 2, operation: 'divide' });
      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(5);
    });

    test('percentage: 50% = 0.5', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 50, operation: 'percentage' });
      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(0.5);
    });

    test('division by zero returns 400', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 5, b: 0, operation: 'divide' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Division by zero');
    });

    test('unknown operation returns 400', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ a: 5, b: 2, operation: 'modulo' });
      expect(res.statusCode).toBe(400);
    });

    test('missing parameter a returns 400', async () => {
      const res = await request(app)
        .post('/calculate')
        .send({ b: 2, operation: 'add' });
      expect(res.statusCode).toBe(400);
    });
  });

});
