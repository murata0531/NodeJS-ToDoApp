const mysql = require("mysql2/promise");
const config = require("../../config.js");

getUserId = async function (id) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        const sql =
            `SELECT * FROM t_user WHERE t_user.id = ?`;
        let d = [id];
        const [rows, fields] = await connection.query(sql, d);
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.getUserId = getUserId;