const {DATABASE_NAME} = require('../.env')
const pg = require('pg')
const config = {
  user: 'postgres', //env var: PGUSER
  database: DATABASE_NAME, //env var: PGDATABASE
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(config)

pool.on('error', (err, client) => {
  console.error('idle error client:', err.message, err.stack)
})

module.exports.query = function (text, values, callback) {
  console.log(text)
  return pool.query(text, values, callback)
} 