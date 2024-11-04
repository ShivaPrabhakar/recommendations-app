require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};