require('dotenv').config()
const { Pool } = require('pg')

const credentials = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASEPORT,
    allowExitOnIdle: true
}

const pool = new Pool(credentials)

module.exports = pool