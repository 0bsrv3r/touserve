const mysql = require("mysql2/promise") 
require('dotenv').config();

const pool = mysql.createPool({ 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    charset: process.env.DB_CHARSET, 
    namedPlaceholders: true, 
    waitForConnections: true, 
    connectionLimit: 100 
}) 
 

module.exports = pool 