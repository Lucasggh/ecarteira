import dotenv from "dotenv"
dotenv.config()
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:process.env.DATABASE_URL
});
const r = await pool.query("select current_database() db, current_schema() schema");
console.log("DB INFO:", r.rows[0]);
export default pool