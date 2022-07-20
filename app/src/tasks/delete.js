// 1件のデータ削除処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

deleteTasksId = async function (id) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        await connection.beginTransaction();

        const sql = "DELETE FROM t_task_management WHERE task_id = ?;";
        let d = [id];
        const [rows, fields] = await connection.query(sql, d);

        const sql2 = "DELETE FROM t_task WHERE id = ?;";
        const [rows2, fields2] = await connection.query(sql2, d);

        await connection.commit();

        return rows;
    } catch (err) {
        await connection.rollback();
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.deleteTasksId = deleteTasksId;