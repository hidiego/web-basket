CREATE TABLE roles
(
  id SMALLINT PRIMARY KEY,
  display_name VARCHAR NOT NULL
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  role SMALLINT REFERENCES roles(id),
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  birthDate TIMESTAMP CHECK(birthDate <= '2017-01-01'),
  regDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  playerNumber SMALLINT
);

INSERT INTO roles (id, display_name) VALUES (0, 'Administrador');
INSERT INTO roles (id, display_name) VALUES (1, 'Entrenador');
INSERT INTO roles (id, display_name) VALUES (2, 'Asistente');
INSERT INTO roles (id, display_name) VALUES (3, 'Jugador');

INSERT INTO users (email, role, password, name, lastName, birthDate) VALUES ('admin@leones', 0 ,'$2a$10$kB/sAqniLVwrqAPFmn0EwO2cv624qzHXFUe/olXOOQoFIJAbCZNwC', 'Diego', 'del Corral', '2016-12-20');