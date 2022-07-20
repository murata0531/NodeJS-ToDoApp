// 一覧取得の処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

postSearchTask = async function (body) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);

        const search_items = body.search_items;
        const search_opt = body.search_opt;
        const search_sort = body.search_sort


        let sql =
            `SELECT t_task.*, m_category.category_name
        FROM m_category RIGHT JOIN t_task ON m_category.id = t_task.category_id
        LEFT JOIN t_task_management ON t_task.id = t_task_management.task_id
        LEFT JOIN t_user_management ON t_task_management.user_management_id = t_user_management.id
        WHERE t_user_management.user_id = ?`;

        let d = [body.nid];

        if (search_items.length > 0) {

            sql += 'AND (';

            for (const item of search_items) {

                if (item === 'done') {
                    sql += 't_task.task_status = ?  OR ';
                    d.push(1);
                } else if (item === 'progress') {
                    sql += 't_task.task_status = ? OR ';
                    d.push(2);
                } else if (item === 'untouched') {
                    sql += 't_task.task_status = ? OR ';
                    d.push(3);
                } else if (item === 'life') {
                    sql += 't_task.category_id = ? OR ';
                    d.push(1);
                } else if (item === 'study') {
                    sql += 't_task.category_id = ? OR ';
                    d.push(2);
                } else if (item === 'work') {
                    sql += 't_task.category_id = ? OR ';
                    d.push(3);
                } else if (item === 'hobby') {
                    sql += 't_task.category_id = ? OR ';
                    d.push(4);
                }
            }

            sql = rtrim(sql, ' OR ');
            sql += ') ';
        }

        sql += `ORDER BY ${search_opt} ${search_sort}`;

        const [list, fields] = await connection.query(sql, d);
        return list;

    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.postSearchTask = postSearchTask;

function rtrim(string, trimString) {
    string = String(string);
    trimString = String(trimString);
    let i = string.length - trimString.length;

    return string.lastIndexOf(trimString, i) === i ? string.slice(0, i) : string;
}