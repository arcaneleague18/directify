// Minimal sample test for server API endpoints
// Requires dev dependency: supertest (npm install --save-dev supertest)
// Run with: npm test or npx jest or node server.test.js if using plain node
//
// To run locally:
//   1. Ensure the backend is able to connect to your PostgreSQL instance.
//   2. Create a test database and populate with a 'places' table for best results.
//   3. Optionally, configure environment variables as per .env.example.

const request = require('supertest');
const path = require('path');
const app = require('./server');

// API endpoint tests

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
    // Try to use a valid sector from the DB if possible
    const allRes = await request(app).get('/api/places');
    if (Array.isArray(allRes.body) && allRes.body.length > 0 && allRes.body[0].sector) {
      const sector = allRes.body[0].sector;
      const res = await request(app).get(`/api/places/${encodeURIComponent(sector)}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    } else {
      // Fallback: just check for status 200 with 'all' sector
      const res = await request(app).get('/api/places/all');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    }
  });

  it('GET /api/places triggers 500 for database error', async () => {
    // Simulate error by temporarily disconnecting pool
    // Defensive: Only run test if pool exists
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

  it('CORS headers should be present for API', async () => {
    const res = await request(app).get('/api/places');
    // Access-Control-Allow-Origin header should be present
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});

// Static file serving tests

describe('Static File Serving', () => {
  it('GET / should serve index.html', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<!DOCTYPE html>/i);
  });

  it('GET /styles.css returns 200 or 404', async () => {
    // This test ensures static file serving is functional
    // It's OK if styles.css does not exist, just check server does not crash
    const res = await request(app).get('/styles.css');
    expect([200, 404]).toContain(res.statusCode);
  });
});
