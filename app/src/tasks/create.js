// 新規登録処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

postCreateTasks = async function (body) {

    let connection = null;

    try {
        connection = await mysql.createConnection(config.dbSetting);
        await connection.beginTransaction();

        const select_um_id = "SELECT id FROM t_user_management WHERE user_id = ? LIMIT 1";
        let d = [body.nid];
        const [um_id, um_id_fields] = await connection.query(select_um_id, d);

        const insert_task = "INSERT INTO `t_task`(`task_name`,`deadline`,`category_id`) VALUES(?,?,?)";
        d = [body.taskName, body.deadline, body.category];
        const [insert_rows, insert_fields] = await connection.query(insert_task, d);

        const insert_task_management =
            "INSERT INTO `t_task_management`(`user_management_id`,`task_id`) VALUES(?,?)";
        d = [um_id[0].id, insert_rows.insertId];
        const [rows, fields] = await connection.query(insert_task_management, d);

        await connection.commit();

        return rows;
    } catch (err) {
        await connection.rollback();
        console.log("エラー" + err);
    } finally {
        connection.end();
    }
};

exports.postCreateTasks = postCreateTasks;