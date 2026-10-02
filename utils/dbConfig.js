import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

dotenv.config({ path: '.env.local' });
dotenv.config();

const dbUrlConfig = [
  ['NEXT_PUBLIC_DATABASE_URL', process.env.NEXT_PUBLIC_DATABASE_URL],
  ['DATABASE_URL', process.env.DATABASE_URL],
  ['NEXT_PUBLIC_DRIZZLE_DB_URL', process.env.NEXT_PUBLIC_DRIZZLE_DB_URL],
  ['NEXT_PUBLIC_DB_URL', process.env.NEXT_PUBLIC_DB_URL],
  ['DB_URL', process.env.DB_URL]
].find(([, value]) => value?.trim());

const [dbUrlVariable, dbUrl] = dbUrlConfig || ['', ''];

if (!dbUrl) {
  console.warn(
    'Missing database connection string. Set DATABASE_URL or NEXT_PUBLIC_DATABASE_URL in your environment (.env.local or deployment env).'
  );
} else {
  console.info(`[database] Using ${dbUrlVariable} environment variable.`);
}

function normalizeDatabaseUrl(value) {
  try {
    const url = new URL(value.trim());
    if (
      !['postgres:', 'postgresql:'].includes(url.protocol) ||
      !url.hostname ||
      url.pathname.length <= 1
    ) {
      throw new Error();
    }

    url.searchParams.set('sslmode', 'require');
    return url.toString();
  } catch {
    throw new Error(
      'The database connection URL is invalid. Use a PostgreSQL URL with a database name.'
    );
  }
}

const connectionString = dbUrl ? normalizeDatabaseUrl(dbUrl) : null;
export const db = connectionString
  ? drizzle({ connection: connectionString, schema })
  : null;

export function ensureDb() {
  if (!db) {
    throw new Error(
      'No database connection string was provided to neon(). Set DATABASE_URL or NEXT_PUBLIC_DATABASE_URL before initializing the app database.'
    );
  }

  return db;
}
