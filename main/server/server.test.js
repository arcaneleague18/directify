// Minimal sample test for server API endpoints
// Requires dev dependency: supertest (npm install --save-dev supertest)
// Run with: npm test or npx jest or node server.test.js if using plain node

const request = require('supertest');
const path = require('path');
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

  it('GET /api/places/:sector returns 200 and array for valid sector', async () => {
    const res = await request(app).get('/api/places/all');
    // Should be 200 even if result is empty array
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/places triggers 500 for database error', async () => {
    // Simulate error by temporarily disconnecting pool
    const origQuery = app.locals && app.locals.pool && app.locals.pool.query;
    if (!origQuery) {
      // Skip test if not possible
      return;
    }
    app.locals.pool.query = () => Promise.reject(new Error('Mock DB error'));
    const res = await request(app).get('/api/places');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toMatch(/Error fetching places/);
    app.locals.pool.query = origQuery;
  });

  it('GET /api/unknown returns API endpoint not found', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/not found/);
  });
});

describe('Static File Serving', () => {
  it('GET / should serve index.html', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<!DOCTYPE html>/i);
  });
});
