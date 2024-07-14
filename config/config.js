require('dotenv').config();

module.exports = {
  development: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require: true, // SSL/TLS is required
        rejectUnauthorized: false
      }
    },
    logging: false  // Disable showing SQL queryies in terminal
  },
  test: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require: true, // SSL/TLS is required
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  production: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require: true, // SSL/TLS is required
        rejectUnauthorized: false
      }
    },
    logging: false
  }
}