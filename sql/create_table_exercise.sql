CREATE TABLE exercise (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  description VARCHAR(255),
  duration INTEGER,
  date TIMESTAMPTZ
);