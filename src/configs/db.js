require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DBUSERNAME,
    host: process.env.DBHOST,
    database: process.env.DBDATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
})

module.exports = pool