const Pool = require("pg").Pool
const pool = new Pool({
  user: process.env.DB_USER || "user",
  host: process.env.DB_HOSTNAME || "localhost",
  database: process.env.DB_NAME || "bamboo-db",
  password: process.env.DB_PASSWOD || "password",
  port: 5432,
})

module.exports = pool