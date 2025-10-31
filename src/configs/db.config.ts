import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../models/index';

const pool = new Pool({
  port: 5432,
  host: 'db',
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });

export async function DBConnection() {
  let client;
  try {
    client = await pool.connect();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    console.log('Database connection failed: ', error);
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}
