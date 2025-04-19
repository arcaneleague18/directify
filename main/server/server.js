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

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'navigation',
  password: 'ghostrider', // Replace with your PostgreSQL password
  port: 5432,
});

// Root route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get all places
app.get('/api/places', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM places');
    res.json(result.rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching places');
  }
});

// API endpoint to get places by sector
app.get('/api/places/:sector', async (req, res) => {
  const sector = req.params.sector;
  try {
    const result = await pool.query('SELECT * FROM places WHERE sector = $1', [sector]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Error fetching places by sector');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});