// 一覧取得の処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

getListTasks = async function () {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        const sql = "SELECT * FROM t_task ";
        let d = [];
        const [tasks, fields] = await connection.query(sql, d);
        const sql2 = "SELECT * FROM m_category";
        const [categories, fields2] = await connection.query(sql2, d);
        const list = { tasks: tasks, categories: categories };
        return list;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.getListTasks = getListTasks;