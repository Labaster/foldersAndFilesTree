const mysql = require('mysql2/promise');
const config = require('config');
const createConn = config.get('server.db.createConn');

const connectionPromise = mysql.createConnection(createConn);
async function execute(sql, params) {
    const connection = await connectionPromise;
    let [rows] = await connection.execute(sql , params);
    return rows;
}

module.exports = {
    connectionPromise,
    execute,
};
