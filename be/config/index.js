require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  // ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  // REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_MAXAGE: process.env.SESSION_MAXAGE,
  SENDER_MAIL: process.env.SENDER_MAIL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  CLIENT_SIDE_URL: process.env.CLIENT_SIDE_URL,
  WHITELIST: process.env.WHITELIST,
};
