const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    nombre: 'Gilberto José Menéndez Pérez',
    expediente: '25839',
    codigo: 'MP22i04001'
  });
});

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.get('/db-check', async (req, res) => {
  const client = new Client({
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'parcial_db'
  });

  try {
    await client.connect();
    const result = await client.query('SELECT 1 AS ok;');
    await client.end();
    res.json({ db: 'OK', result: result.rows[0] });
  } catch (e) {
    res.status(500).json({ db: 'ERROR', message: e.message });
  }
});

app.listen(PORT, () => console.log(`Servidor ejecutándose en puerto ${PORT}`));
