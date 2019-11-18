
CREATE TABLE users
(
  email VARCHAR PRIMARY KEY,
  password VARCHAR NOT NULL
);

INSERT INTO users (email, password) VALUES ('jane@doe.com', 'password');
