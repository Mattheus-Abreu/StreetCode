
const{ Pool }= require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StreetCode_DB',
  password: '1234',
  port: 5432
  
})

module.exports = pool