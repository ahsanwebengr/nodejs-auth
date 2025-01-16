import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApiError from './utils/ApiError.js';
import { CORS_ORIGIN } from './configs/env.config.js';
import router from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, Welcome to Node JS!');
});

app.use(router);
app.all('*', (req, res, next) => {
  next(new ApiError(404, 'Page not found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).json({ error: message, success: false });
});

export { app };
