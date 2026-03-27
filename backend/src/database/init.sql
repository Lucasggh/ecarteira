CREATE DATABASE ecarteira;

\c ecarteira;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        cpf VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL
    );