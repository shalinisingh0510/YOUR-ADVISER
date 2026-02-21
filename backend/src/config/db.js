import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const truthy = new Set(["1", "true", "yes", "on"]);
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const useSsl =
  truthy.has(String(process.env.DB_SSL || "").toLowerCase()) ||
  /sslmode=require/i.test(process.env.DATABASE_URL || "");

const pool = new Pool(
  hasDatabaseUrl
    ? {
        connectionString: process.env.DATABASE_URL,
        ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {})
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {})
      }
);

pool.on("connect", () => {
  console.log("PostgreSQL connected successfully");
});

export default pool;
