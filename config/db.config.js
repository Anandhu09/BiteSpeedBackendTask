require('dotenv').config(); // Load environment variables from .env file for additional safety

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "root123",
  DB: process.env.DB_NAME || "my_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
