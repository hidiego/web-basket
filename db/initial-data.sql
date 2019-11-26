
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  birthDate TIMESTAMP CHECK(birthDate <= '2017-01-01'),
  reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, name, lastName, birthDate) VALUES ('diego@corral.com', 'password', 'Diego', 'del Corral', '2016-12-20');
