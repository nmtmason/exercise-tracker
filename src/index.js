require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('./client');
const client = new Client(process.env.DATABASE_URL);

const getDate = timestamp => {
  return new Date(timestamp).toString().slice(0, 15);
};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    next(error);
  });
};

//eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  res
    .status(500)
    .send({ error: error.message })
    .end();
};

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post(
  '/api/exercise/new-user',
  asyncMiddleware(async (req, res) => {
    let username = req.body.username;
    if (!username) {
      throw new Error('Please provide a username');
    }

    let result = await client.first(
      'SELECT id, username FROM users WHERE username = $1',
      [username]
    );
    if (result) {
      throw new Error('User already exists');
    }

    let user = await client.first(
      'INSERT INTO users (username) VALUES ($1) RETURNING id, username',
      [username]
    );
    res.send(user);
  })
);

app.post(
  '/api/exercise/add',
  asyncMiddleware(async (req, res) => {
    let { userId, description, duration, date } = req.body;
    let exercise = await client.first(
      'INSERT INTO exercise (user_id, description, duration, date) VALUES ($1, $2, $3, $4) RETURNING user_id AS userId, description, duration, date',
      [userId, description, duration, new Date(date)]
    );

    res.send(Object.assign({}, exercise, { date: getDate(date) }));
  })
);

app.get(
  '/api/exercise/log',
  asyncMiddleware(async (req, res) => {
    let { userId, from, to, limit } = req.query;
    if (!userId) {
      throw new Error('A user ID is required');
    }

    let user = await client.query(
      'SELECT id, username FROM users WHERE id = $1',
      [userId]
    );
    let log = (await client.query(
      `SELECT description, duration, date FROM exercise WHERE user_id = $1 AND date >= COALESCE($2, date) AND date <= COALESCE($3, date) LIMIT $4`,
      [
        userId,
        from ? new Date(from) : null,
        to ? new Date(to) : null,
        limit || null
      ]
    )).map(entry => {
      return Object.assign({}, entry, {
        date: getDate(entry.date)
      });
    });

    res.send(Object.assign({}, user, { count: log.length, log }));
  })
);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  client.connect();
});
