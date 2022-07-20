const mysql = require("mysql2/promise");
const config = require("./config.js");

module.exports = async function (req, res, next) {
    let connection = null;
    let normalId = req.session.normal_id;

    try {
        connection = await mysql.createConnection(config.dbSetting);

        const query = "SELECT id,user_name,email FROM t_user WHERE id = ?";
        const d = [normalId];

        if (normalId) {
            const [rows, fields] = await connection.query(query, d);
            res.locals.normal_user = rows.length ? rows[0] : false;
        }
        next();
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};