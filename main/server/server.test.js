// Minimal sample test for server API endpoints
// Requires dev dependency: supertest (npm install --save-dev supertest)
// Run with: npx jest or node server.test.js if using plain node

const request = require('supertest');
const app = require('./server');

describe('API Endpoints', () => {
  it('GET /api/places should return places array', async () => {
    const res = await request(app).get('/api/places');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/places/:sector should validate sector input', async () => {
    const res = await request(app).get('/api/places/invalid!sect0r');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid sector/);
  });
});
