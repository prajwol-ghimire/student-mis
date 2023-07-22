
const mysql = require("./connection").con;


// email : master.account@ncit.edu.np
// password : apple

//user_infos
query1 = `INSERT INTO user_infos (sid, username, email, password, permission_type, otp_temp, otp_verified, createdAt, updatedAt)
SELECT 1 AS SID,
'Master Account' AS username, 
'master.account@ncit.edu.np' AS email, 
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
'user.png' AS user_image,  
CURRENT_TIMESTAMP AS createdAt, 
CURRENT_TIMESTAMP AS updatedAt
WHERE NOT EXISTS (SELECT 1 FROM user_data WHERE SID = 1)`

mysql.query(query3, (err, results) => {
  if (err) {
    console.error('Error inserting data: ', err);
  }
});


query4 =  `
INSERT INTO \`subject_data\` (\`id\`, \`course_name\`, \`abbreviation\`, \`course_code\`, \`faculty\`, \`semester\`, \`credit\`, \`createdAt\`, \`updatedAt\`) VALUES
    (1, 'C Programming', 'cprog', 'CMP-114', 'BE Software', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Engineering Mathematics I', 'mathi', 'MTH 112', 'BE Software', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Communication Techniques', 'ct', 'ENG 111', 'BE Software', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Fundamentals of IT', 'fit', 'CMP 110', 'BE Software', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Physics', 'physics', 'PHY 111', 'BE Software', 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Problem Solving Techniques', 'pst', 'CMP 114', 'BE Software', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'Engineering Mathematics II', 'mathii', 'MTH 114', 'BE Software', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'Logic Circuits', 'lc', 'ELX 212', 'BE Software', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'Mathematical Foundation of Computer Science', 'mfcs', 'MTH 130', 'BE Software', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 'Object Oriented Programming in C++', 'oop', 'CMP 115', 'BE Software', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, 'Engineering Drawing', 'drawing', 'MEC 120', 'BE Software', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (12, 'Web Technology', 'wt', 'CMP 213', 'BE Software', 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (13, 'Engineering Mathematics III', 'mathiii', 'MTH 212', 'BE Software', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 'Data Structure and Algorithms', 'dsa', 'CMP 225', 'BE Software', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (15, 'Software Engineering Fundamentals', 'sef', 'CMP 220', 'BE Software', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (16, 'Probability and Queuing Theory', 'pqt', 'MTH 221', 'BE Software', 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (17, 'Programming in Java', 'java', 'CMP 212', 'BE Software', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (18, 'Microprocessor and Assembly Language Programming', 'malp', 'CMP 214', 'BE Software', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
    \`course_name\` = VALUES(\`course_name\`),
    \`abbreviation\` = VALUES(\`abbreviation\`),
    \`course_code\` = VALUES(\`course_code\`),
    \`faculty\` = VALUES(\`faculty\`),
    \`semester\` = VALUES(\`semester\`),  
    \`credit\` = VALUES(\`credit\`),
    \`createdAt\` = VALUES(\`createdAt\`),
    \`updatedAt\` = VALUES(\`updatedAt\`);
`;
mysql.query(query4, (err, results) => {
  if (err) {
    console.error('Error inserting data: ', err);
  }
});
