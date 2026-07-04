const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Serve static files from the public directory (where index.html will be)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * PostgreSQL connection configuration
 *
 * SECURITY NOTICE:
 * Do NOT hardcode credentials in production. Use environment variables.
 *
 * To use environment variables, create a .env file (see .env.example).
 * Use the 'dotenv' package for local development (npm install dotenv).
 *
 * Example:
 *   user: process.env.PGUSER,
 *   ...
 */
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'navigation',
  password: process.env.PGPASSWORD || 'ghostrider',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
});

// For test mocking and better maintainability, attach pool to app.locals
app.locals.pool = pool;

/**
 * Root route to serve the main page (index.html).
 * Serves the single-page application entry point.
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * API endpoint to get all places from the 'places' table.
 * Returns: Array of place objects.
 * Responds with JSON.
 * On error, responds with { error: string } and status 500.
 */
app.get('/api/places', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM places');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching places:', err.stack);
    res.status(500).json({ error: 'Error fetching places' });
  }
});

/**
 * API endpoint to get all places within a specific sector.
 * Validates input to avoid SQL injection.
 * Returns: Array of place objects for sector.
 * On error, responds with { error: string } and status 500 or 400.
 */
app.get('/api/places/:sector', async (req, res) => {
  const sector = req.params.sector;
  // Simple validation: restrict sector parameter to alphanumeric/underscore/hyphen
  if (!/^[\w-]+$/.test(sector)) {
    return res.status(400).json({ error: 'Invalid sector parameter' });
  }
  try {
    const result = await pool.query('SELECT * FROM places WHERE sector = $1', [sector]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching places by sector:', err.stack);
    res.status(500).json({ error: 'Error fetching places by sector' });
  }
});

// 404 handler for unknown API endpoints
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for testing
