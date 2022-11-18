CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT NOT NULL
);