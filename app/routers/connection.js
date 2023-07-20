const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});


// Create the database if it doesn't exist
connection.query('CREATE DATABASE IF NOT EXISTS student_mis', (error, results) => {
  if (error) {
    console.error('Error creating database:', error);
  } else {
    console.log('Database created successfully');
  }

  // Close the connection
  connection.end();
});

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
