// 新規登録処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

postCreateOuser = async function (body) {

    let connection = null;

    try {
        connection = await mysql.createConnection(config.dbSetting);
        await connection.beginTransaction();
        const sql = "INSERT INTO `t_user`(`user_name`,`email`,`password`) VALUES(?,?,?);";
        let d = [body.userName, body.email, body.password];

        const [rows, fields] = await connection.query(sql, d);

        const sql2 = "INSERT INTO `t_user_management`(`user_id`,`organization_id`) VALUES(?,?);";
        d = [rows.insertId, body.oid];

        const [rows2, fields2] = await connection.query(sql2, d);
        await connection.commit();

        return rows2;
    } catch (err) {
        await connection.rollback();
        console.log("エラー" + err);
    } finally {
        connection.end();
    }
};

exports.postCreateOuser = postCreateOuser;