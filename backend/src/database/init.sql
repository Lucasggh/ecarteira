CREATE DATABASE ecarteira;

\c ecarteira;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        cpf VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    CREATE TABLE transactions(
        id SERIAL PRIMARY KEY,
        amount BIGINT NOT NULL,
        type VARCHAR(20) NOT NULL,
        sender_id INT,
        receiver_id INT,

        CONSTRAINT fk_sender
        FOREIGN KEY (sender_id)
        REFERENCES users(id),

        CONSTRAINT fk_receiver
        FOREIGN KEY (receiver_id)
        REFERENCES users(id)

    )