import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

async function main() {
  try {
    console.log('Starting migration...');
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL
    });
    
    const db: NodePgDatabase = drizzle(pool);

    await migrate(db, { migrationsFolder: 'src/migrations/drizzle' });

    console.log('migration completed!')
    
    await pool.end();
  } catch (error) {
    console.log('Migration failed: ', error);
  }
}

main();
