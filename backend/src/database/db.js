import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function testConnection() {
    try {
        const client = await pool.connect();
        const r = await client.query("SELECT current_database() db, current_schema() schema");
        console.log("✅ Database connected:", r.rows[0]);
        client.release();
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }
}

export default pool;