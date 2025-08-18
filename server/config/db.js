import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pkg;

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Required for Supabase
});

db.connect()
  .then(() => console.log('Connected to Supabase'))
  .catch((err) => console.error('Database connection error:', err));

export default db;
