
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL
);

INSERT INTO users (email, password) VALUES ('jane@doe.com', 'password');
