const { Pool, Client } = require('pg')
const fs = require('fs')

const scriptSQL = fs.readFileSync('./create.sql').toString()
console.log(scriptSQL)

// const pool = new Pool({
//   user: 'user',
//   host: 'localhost',
//   database: 'bamboo-db',
//   password: 'password',
//   port: 5432,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'bamboo-db',
  password: 'password',
  port: 5432,
})
client.connect()
client.query(scriptSQL, (err, res) => {
  console.log(err, res)
  client.end()
})

client.