// 一覧取得の処理
const mysql = require("mysql2/promise");
const config = require("../../config.js");

getListNormals = async function (id) {
    let connection = null;
    try {
        connection = await mysql.createConnection(config.dbSetting);
        // const sql =
        //     `SELECT t_user.id, t_user.user_name 
        //      FROM t_user LEFT JOIN t_user_management 
        //         ON t_user.id = t_user_management.user_id
        //         INNER JOIN t_organization ON t_user_management.organization_id = t_organization.id
        //         WHERE t_organization.id = ?`;
        // let d = [id];
        // const [ousers, fields] = await connection.query(sql, d);
        const sql2 = "SELECT * FROM m_category";
        let d = [];
        const [categories, fields2] = await connection.query(sql2, d);
        const list = { categories: categories };
        return list;
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};

exports.getListNormals = getListNormals;