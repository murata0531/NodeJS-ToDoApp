// 更新処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

patchTasksId = async function (id, body) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        // ここに SQL を記述する
        const sql =
            "UPDATE t_task SET task_name=?, deadline=?, category_id=?, task_status=?, updated_at=? WHERE id=?;";
        let d = [
            body.taskName,
            body.deadline,
            body.category,
            body.status,
            new Date(),
            id,
        ];
        const [rows, fields] = await connection.query(sql, d);
        return rows;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.patchTasksId = patchTasksId;