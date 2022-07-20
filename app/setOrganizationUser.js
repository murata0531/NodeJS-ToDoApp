const mysql = require("mysql2/promise");
const config = require("./config.js");

module.exports = async function (req, res, next) {
    let connection = null;
    let organizationId = req.session.organization_id;

    try {
        connection = await mysql.createConnection(config.dbSetting);

        const query = "SELECT id,organization_name,email FROM t_organization WHERE id = ?";
        const d = [organizationId];

        if (organizationId) {
            const [rows, fields] = await connection.query(query, d);
            res.locals.organization_user = rows.length ? rows[0] : false;
        }
        next();
    } catch (err) {
        console.log(err);
    } finally {
        connection.end();
    }
};