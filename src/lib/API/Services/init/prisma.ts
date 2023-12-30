import { neonConfig, Pool, PoolConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, Prisma } from '@prisma/client';
import ws from 'ws';

declare global {
  var prisma: PrismaClient | undefined;
}

// setup
neonConfig.webSocketConstructor = ws;
const isTest = process.env.NODE_ENV === 'test';
const DB_URL_TEST = process.env.DATABASE_URL_TEST;
const DB_URL = process.env.DATABASE_URL;
const connectionString = isTest ? DB_URL_TEST : DB_URL;
const poolConfig: PoolConfig = { connectionString: DB_URL };

// instantiate
const pool = new Pool(poolConfig);
const adapter = new PrismaNeon(pool);

const prisma = global.prisma || new PrismaClient({ adapter });

// cache on global for HOT RELOAD in dev
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export { Prisma };

export default prisma;
