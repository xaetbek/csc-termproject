const mysql = require('mysql2');

// create the connection to database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'csc317db',
    password: '12345678',
    debug: false
});

const promisePool = db.promise();

module.exports = promisePool; 