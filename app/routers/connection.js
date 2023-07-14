const mysql = require("mysql2");

// Create a MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_mis",
  port: 3306
});

// Connect to the MySQL server
con.connect((err) => {
  if (err) throw err;
  console.log("Connection created..!!");
});

// Export the MySQL connection
module.exports.con = con;
