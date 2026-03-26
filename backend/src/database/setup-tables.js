import pool from './db.js';

async function setupDatabase() {
  console.log("Criando tabelas no banco de dados...");
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          cpf VARCHAR(20) UNIQUE NOT NULL,
          password TEXT NOT NULL
      );
    `);
    console.log("Tabela 'users' verificada/criada com sucesso!");
  } catch (error) {
    console.error("Erro ao configurar banco de dados:", error);
  } finally {
    await pool.end();
    console.log("Conexão encerrada.");
  }
}

setupDatabase();
