let express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt")
const mysql = require("./connection").con
const nodemailer = require("nodemailer")

// Generate a random job title

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: "Mis@123sTudent!@outlook.com",
        pass: "Mis@123sTudent!",
    },
})

/**
 * Sends OTP verification email
 * @param {string} nonhashedroll - Unhashed roll number
 * @param {string} email - Email address
 * @param {Object} res - Response object
 * @param {string} nonhashedusername - Unhashed username
 * @param {string} permission - Permission type
 */
const sendOTPVerification = async (nonhashedroll, email, res, nonhashedusername, permission) => {
    try {
        const otp = `${Math.floor(10000 + Math.random() * 90000)}`;
        const mailOptions = {
            from: "Mis@123sTudent!@outlook.com",
            to: email,
            subject: "Verify Your Email",
            html: `<p> Enter ${otp} in the app to verify email address and complete the signup`,
        };

        const saltRounds = 7;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        // await transporter.sendMail(mailOptions)
        console.log(otp)
        const query = `UPDATE user_infos SET otp_temp = '` + hashedOTP + `' WHERE sid = '` + nonhashedroll + `'`;
        mysql.query(query, (err, results) => {
            if (err) {
                res.render("landing.hbs", { otpnotverified: false, cookies: true, rollno: nonhashedroll, user_name: nonhashedusername, permission: permission });
            } else {
                res.render("landing.hbs", { otpnotverified: true, cookies: true, rollno: nonhashedroll, user_name: nonhashedusername, permission: permission });
            }
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
}

/**
 * Compares the cookie values with hashed values and performs verification
 * @param {string} username - Hashed username cookie value
 * @param {string} rollno - Hashed roll number cookie value
 * @param {string} nonhashedroll - Unhashed roll number
 * @param {string} nonhashedusername - Unhashed username
 * @param {string} permission - Permission type
 * @param {Object} res - Response object
 * @param {string} email - Email address
 */
async function compareCookie(username, rollno, nonhashedroll, nonhashedusername, permission, res, email) {
    const intexamroll = nonhashedroll.toString();
    const user_name = await bcrypt.compare(nonhashedusername, username);
    const roll_no = await bcrypt.compare(intexamroll, rollno);
    if (user_name && roll_no) {
        const query = `SELECT otp_verified from user_infos where sid = ?`;
        mysql.query(query, nonhashedroll, (err, results) => {
            if (err) throw err;
            else {
                if (results.length > 0) {
                    const otpverified = results[0].otp_verified;
                    if (otpverified) {
                        // res.render("student/html/index.hbs", {otpnotverified : false, cookies : true, rollno : nonhashedroll, user_name : nonhashedusername, permission : permission}); 
                        let qry = "select * from user_infos join user_data on user_infos.sid=user_data.sid";   
                        mysql.query(qry, nonhashedroll, (err, recivedresults) => {
                            if (err) throw err;
                            else { 
                

                                username = recivedresults[0].username
                                crn=recivedresults[0].crn                                
                                user_image=recivedresults[0].user_image
                                email = recivedresults[0].email
                                permission=recivedresults[0].permission_type

                                if (permission == "Student"){
                                        res.render("student/html/index.hbs",{username : username, email : email, rollno : nonhashedroll,permission:permission, photo:user_image,crn:crn})
                                }
                                else if(permission == "Administrator"){
                                    res.render("admin/html/admin_index.hbs",{username : username, email : email, rollno : nonhashedroll,permission:permission, photo:user_image,crn:crn})
                                }

                            }
                        });
                    } else {
                        sendOTPVerification(nonhashedroll, email, res, nonhashedusername, permission)
                    }
                } else {
                    res.render('login.hbs', { nosuchuser: true });
                }
            }
        });
    } else {
        res.render("landing.hbs");
    }
}

/**
 * Retrieves the username and performs cookie comparison
 * @param {string} username - Hashed username cookie value
 * @param {string} rollno - Hashed roll number cookie value
 * @param {string} nonhashedroll - Unhashed roll number
 * @param {Object} res - Response object
 */
function getUsername(username, rollno, nonhashedroll, res) {
    let qry = "select username from user_infos where sid = ?";
    mysql.query(qry, nonhashedroll, (err, recivedresults) => {
        if (err) throw err;
        else {
            if (recivedresults.length > 0) {
                const nonhashedusername = recivedresults[0].username;
                const permission = recivedresults[0].permission_type;
                const email = recivedresults[0].permission_type;
                compareCookie(username, rollno, nonhashedroll, nonhashedusername, permission, res, email);
            } else {
                res.render("landing.hbs");
            }
        }
    });
}

/**
 * Manages the cookie and performs necessary operations
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function cookies_manager(req, res) {
    const rawCookieHeader = req.header('Cookie');
    let username = null;
    let rollno = null;

    if (rawCookieHeader) {
        const cookies = rawCookieHeader.split('; ');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');

            if (cookieName === '_user_auth') {
                username = cookieValue;
            } else if (cookieName === '_user_sid') {
                rollno = cookieValue;
            }
        }
    }

    if (username && rollno) {
        let nusername = decodeURIComponent(username)
        let npassword = decodeURIComponent(rollno)
        let qry = "select sid from user_cookies where username_cookie = ?";
        mysql.query(qry, nusername, (err, recivedresults) => {
            if (err) throw err;
            else {
                if (recivedresults.length > 0) {
                    const nonhashedroll = recivedresults[0].sid;
                    getUsername(nusername, npassword, nonhashedroll, res);
                } else {
                    res.render("landing.hbs");
                }
            }
        });
    } else {
        res.render("landing.hbs");
    }
}

module.exports = cookies_manager;
