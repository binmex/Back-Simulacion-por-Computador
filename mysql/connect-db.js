const {createPool} = require('mysql2/promise')

exports.pool = createPool({
  host:"localhost",
  user: "root",
  password: 2002,
  port: 3306,
  database:"universidad"
});