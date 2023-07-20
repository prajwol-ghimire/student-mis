
const mysql = require("./connection").con;


// email : test.123@ncit.edu.np
// password : apple

//user_infos
query1 = `INSERT INTO user_infos (sid, username, email, password, permission_type, otp_temp, otp_verified, createdAt, updatedAt)
SELECT 1 AS SID,
'Test Man' AS username, 
'test.123@ncit.edu.np' AS email, 
'$2b$10$Ruge19J.GD8wPf4nA4y2eeG2eai1a6LArhklId5Ku6uW/6uj8fYoC' AS password, 
'Administrator' AS permission_type, 
NULL AS otp_temp, 
1 AS otp_verified, 
CURRENT_TIMESTAMP AS createdAt, 
CURRENT_TIMESTAMP AS updatedAt
WHERE NOT EXISTS (SELECT 1 FROM user_infos WHERE SID = 1)`

mysql.query(query1, (err, results) => {
  if (err) {
    console.error('Error inserting data: ', err);
  }
});

//user_cookies
query2 = `INSERT INTO user_cookies (sid, reset_token_temp, reset_token_time, createdAt, updatedAt)
SELECT 1 AS SID,
NULL AS reset_token_temp, 
NULL AS reset_token_time, 
CURRENT_TIMESTAMP AS createdAt, 
CURRENT_TIMESTAMP AS updatedAt
WHERE NOT EXISTS (SELECT 1 FROM user_cookies WHERE SID = 1)`

mysql.query(query2, (err, results) => {
  if (err) {
    console.error('Error inserting data: ', err);
  }
});

// user_data
query3 = `INSERT INTO user_data (sid, crn, user_image, createdAt, updatedAt)
SELECT 1 AS SID,
NULL AS crn, 
NULL AS user_image,  
CURRENT_TIMESTAMP AS createdAt, 
CURRENT_TIMESTAMP AS updatedAt
WHERE NOT EXISTS (SELECT 1 FROM user_data WHERE SID = 1)`

mysql.query(query3, (err, results) => {
  if (err) {
    console.error('Error inserting data: ', err);
  }
});