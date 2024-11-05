require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};