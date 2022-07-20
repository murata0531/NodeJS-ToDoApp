// 一覧取得の処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

getListOrganizations = async function (id) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        const sql =
            `SELECT t_user.id AS user_id, t_user.user_name,um.id AS um_id
             FROM t_user
                LEFT JOIN t_user_management um
                    ON t_user.id = um.user_id
                INNER JOIN t_organization
                    ON um.organization_id = t_organization.id
             WHERE t_organization.id = ?`;
        let d = [id];
        const [ousers, fields] = await connection.query(sql, d);

        const sql2 =
            `SELECT t_task.*,um.id AS um_id
             FROM t_task
                INNER JOIN t_task_management tm
                    ON t_task.id = tm.task_id
                INNER JOIN t_user_management um
                    ON tm.user_management_id = um.id
             WHERE um.organization_id = ?`;

        const [tasks, fields2] = await connection.query(sql2, d);

        const sql3 = "SELECT * FROM m_category";
        d = [];
        const [categories, fields3] = await connection.query(sql3, d);

        const list = { ousers: ousers, tasks: tasks, categories: categories };
        return list;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.getListOrganizations = getListOrganizations;
