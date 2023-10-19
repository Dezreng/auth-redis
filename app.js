import express from 'express';
import bodyParser from 'body-parser';
import RedisStore from "connect-redis"
import session from "express-session"

import { client } from './db/connect.js'
import { authRouter } from './routes/auth.js';
import { balanceRouter } from './routes/balance.js';
import { CONFIG } from './common/config.js';


const app = express();

// Initialize store.
let redisStore = new RedisStore({
  client: client,
  prefix: "PHPREDIS_SESSION:",
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: CONFIG.SECRET,
    name: 'PHPREDIS'
  })
)

app.get('/', (req, res, next) => {
  res.json({ text: 'test' })
})
app.use('/auth', authRouter);
app.use('/balance', balanceRouter);

app.use(async (err, req, res, next) => {
  console.error(err.stack)
  const message = err.message ? err.message : 'Something broke!';
  const statusCode = err.code ? err.code : 500;
  res.status(statusCode).send(message);
})

app.listen(CONFIG.PORT, () => {
  console.log(`Server running on: http://localhost:${3000}`);
});
