const mysql = require("mysql2")
const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "test11",
    port: 3306
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = con;