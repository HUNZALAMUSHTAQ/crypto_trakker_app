const mysql = require('mysql2'); // Using mysql2 as it return a Promise
require("dotenv").config(); // For accessing the env variables

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

module.exports = pool.promise()