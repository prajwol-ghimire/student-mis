const { check, validationResult } = require('express-validator');
const mysql = require("./connection").con;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { await } = require('await');

// Create a nodemailer transporter
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: "student_mis.ncit@outlook.com",
        pass: "Mis@123sTudent!",
    },
});

/**
 * Send user registration details via email
 * @param {string} examroll - Exam roll number
 * @param {string} email - User's email address
 * @param {string} password - User's plaintext password
 * @param {string} username - User's username
 * @param {Object} res - Response object
 */
async function sendUserDetails(examroll, email, password, username, res) {
    const mailOptions = {
        from: "student_mis.ncit@outlook.com",
        to: email,
        subject: "STUDENT-MIS REGISTRATION",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Student-MIS</a>
            </div>
            <p style="font-size:1.1em">Congratulations you're succefully signed-up to Student-MIS.</p>
            <p>Please use the following credentials to <a href="http://34.124.157.134/">login</a> to Student-MIS.</p>
            <h4>Exam Roll: ${examroll}</h4>
            <h4>E-mail:  ${email}</h4>
            <h4>Username: ${username}</h4>
            <h4>Password:  ${password}</h4>

            <p style="font-size:0.9em;">Regards,<br />Student-MIS<br />Nepal College of Information Technology<br />Balkumari, Lalitpur</p>
            <hr style="border:none;border-top:1px solid #eee" />
            </div>
        </div>
        
        
            `,
    };
    console.log(password);
    res.redirect('/viewsusers');
    await transporter.sendMail(mailOptions);
   
}

/**
 * Sign up a user and store their details in the database
 * @param {Object} res - Response object
 * @param {string} examroll - Exam roll number
 * @param {string} username - User's username
 * @param {string} email - User's email address
 * @param {string} permission - User's permission type
 * @param {string} faculty - Faculty of the user
 * @param {string} semester - Semester of the user
 */
async function signUpSQL(res, examroll, username, email, permission,faculty) {
    const min = Math.ceil(1111);
    const max = Math.floor(9999);
    const randomnum1 = Math.floor(Math.random() * (max - min)) + min;
    const randomnum2 = Math.floor(Math.random() * (max - min)) + min;
    const plaintextPassword = randomnum1 + "@NciT!" + randomnum2;
    const hashedpassword = await bcrypt.hash(plaintextPassword, 10);
    let qry = "select * from user_infos where sid = ?";
    mysql.query(qry, examroll, (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {
                res.redirect("/signup?error=alreadyuser")
            } else {
                const query = `INSERT INTO user_infos (sid, username, email, password, otp_verified, permission_type) VALUES ('${examroll}','${username}','${email}','${hashedpassword}','0','${permission}')`;
                mysql.query(query, (err, results) => {
                    if (err) {
                        console.error('Error inserting data: ', err);
                         res.redirect("/signup?error=500error")
                    } else {
                        if(permission == "Student"){                        
                            const regex = /\d+/; // Matches one or more digits
                            const match = email.match(regex);
                            const crn = match ? match[0] : null;
                            const query = `INSERT INTO user_data (sid,faculty,crn, user_image) VALUES ('${examroll}','${faculty}','${crn}','user.png')`
                            mysql.query(query, (err, results) => {
                                if (err) {
                                    console.error('Error inserting data: ', err);
                                     res.redirect("/signup?error=500error")
                                } else {
                                    const query = `INSERT INTO user_cookies (sid) VALUES ('${examroll}')`;
                                    mysql.query(query, (err, results) => {
                                        if (err) {
                                            console.error('Error inserting data: ', err);
                                             res.redirect("/signup?error=500error")
                                        } else {
                                            sendUserDetails(examroll, email, plaintextPassword, username, res);
                                        }
                                    });
                                }
                            });       
                        }
                        else{
                            const query = `INSERT INTO user_data (sid, user_image) VALUES ('${examroll}','user.png')`
                            mysql.query(query, (err, results) => {
                                if (err) {
                                    res.redirect("/signup?error=500error")
                                }else{
                                    const query = `INSERT INTO user_cookies (sid) VALUES ('${examroll}')`;
                                    mysql.query(query, (err, results) => {
                                        if (err) {
                                            console.error('Error inserting data: ', err);
                                             res.redirect("/signup?error=500error")
                                        } else {
                                            sendUserDetails(examroll, email, plaintextPassword, username, res);
                                        }
                                    }); 
                                }
                            });
                        }                 
                    }
                });
            }
        }
    });
}

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function validateEmail(email) {
    const parts = email.split("@");
    if (parts.length !== 2) {
        return false;
    }
    const [username, domain] = parts;
    const domainParts = domain.split(".");
    if (domainParts.length < 3 || domainParts[domainParts.length - 1] !== "np") {
        return false;
    }
    if (domainParts[domainParts.length - 2] !== "edu" || domainParts[domainParts.length - 3] !== "ncit") {
        return false;
    }
    return true;
}

/**
 * Validate and process user sign up request
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function signupValidate(req, res) {
    const email = req.body.email;
    const isValid = validateEmail(email);
    if (isValid) { 
        const sid = req.body.examroll;
        const username = req.body.username;
        const permission = req.body.permission_type;
        const faculty = req.body.faculty;
        const semester = null;
        const registration = null;
        signUpSQL(res, sid, username, email, permission,faculty,semester,registration);
    } else {
        res.redirect("/signup?error=emailInvalid")
    }
}

module.exports = signupValidate;
