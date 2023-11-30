CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60),
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) UNIQUE,
  description TEXT NOT NULL,
  UNIQUE (user_id, title) 
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  data TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  name VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

INSERT INTO users (email, password, admin)
  VALUES ('admin@admin.com','$2a$10$IML8QCf6xA.alRbW.CG5PuvYc3Qs94vJvoTwbsSehs8s515cUMuZa', true);

INSERT INTO recipes (user_id, title, description)
  VALUES ((SELECT id FROM users WHERE email = 'admin@admin.com'), 'Butter Noodles', 'Butter and Noodles');

INSERT INTO ingredients (recipe_id, name) VALUES (1, 'Butter'), (1, 'Noodles'), (1, 'Water');