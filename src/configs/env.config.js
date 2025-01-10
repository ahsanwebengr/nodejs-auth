import dotenv from 'dotenv';
dotenv.config({
  path: './.env'
});

const {
  PORT,
  CORS_ORIGIN,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASSWORD
} = process.env;

export {
  PORT,
  CORS_ORIGIN,
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASSWORD
};
