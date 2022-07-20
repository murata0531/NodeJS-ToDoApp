const mysql = require("mysql2/promise");
const config = require("../../config.js");

patchUserId = async function (id, body) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);

        let sql = '';
        let d = [];
        if (body.password === '') {
            sql = "UPDATE t_user SET user_name = ?, email = ? WHERE id = ?";
            d = [
                body.userName,
                body.email,
                id,
            ];
        } else {
            sql = "UPDATE t_user SET user_name = ?, email = ?, password = ? WHERE id = ?";
            d = [
                body.userName,
                body.email,
                body.password,
                id,
            ];
        }

        const [rows, fields] = await connection.query(sql, d);
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.patchUserId = patchUserId;