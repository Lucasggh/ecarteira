import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "127.0.0.1", // default para localhost
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});
const r = await pool.query("select current_database() db, current_schema() schema");
console.log("DB INFO:", r.rows[0]);
export default pool