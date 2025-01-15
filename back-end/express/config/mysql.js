const mysql = require("mysql2")

const mysqlConnection = async () =>{
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'marketplace',
    });

    return connection;
}

module.exports = mysqlConnection