let express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt")
const mysql = require("./connection").con
const nodemailer = require("nodemailer")
const cookies = require('./cookieEnDc.js')

// Generate a random job title

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: "student_mis.ncit@outlook.com",
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
            from: "student_mis.ncit@outlook.com",
            to: email,
            subject: "Verify Your Email",
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Student-MIS</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Please use the following OTP to complete your Sign Up procedures.</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Student-MIS<br />Nepal College of Information Technology<br />Balkumari, Lalitpur</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    </div>
                </div>`,
        };

        const saltRounds = 7;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        console.log(otp)
        const query = `UPDATE user_infos SET otp_temp = '` + hashedOTP + `' WHERE sid = '` + nonhashedroll + `'`;
        mysql.query(query, (err, results) => {
            if (err) {
                res.render("html/landing.hbs", { otpnotverified: false, cookies: true, rollno: nonhashedroll, user_name: nonhashedusername, permission: permission });
            } else {
                res.render("html/landing.hbs", { otpnotverified: true, cookies: true, rollno: nonhashedroll, user_name: nonhashedusername, permission: permission });
            }
        });
        await transporter.sendMail(mailOptions)
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

function getUsername(username, rollno, res) {
    let qry = "select * from user_infos join user_data on user_infos.sid=user_data.sid where user_infos.sid = '"+ rollno +"' ";   
    mysql.query(qry, (err, recivedresults) => {
        if (err) throw err;
        else { 
            if (recivedresults.length > 0) {
                username = recivedresults[0].username
                crn=recivedresults[0].crn                                
                user_image=recivedresults[0].user_image
                email = recivedresults[0].email   
                otpverified = recivedresults[0].otp_verified;
                permission = recivedresults[0].permission_type;
                if (otpverified) {
                    if (permission == "Student"){
                            res.render("html/index.hbs",{username : username, email : email, rollno : rollno,permission:permission, photo:user_image,crn:crn})
                    }
                    else if(permission == "Administrator"){
                        let qry =  `SELECT permission_type, COUNT(*) AS total_count FROM user_infos GROUP BY permission_type; `
                        mysql.query(qry,(err, recivedresults) => {
                            if (err) throw err;
                            else { 
                                res.render("html/admin_index.hbs",{username : username, email : email, rollno : rollno,permission:permission, photo:user_image,crn:crn, dashboardinfo : recivedresults})
                            }
                        });                                   
                    }
                } else {
                    sendOTPVerification(crn, email, res, username, permission)
                }
            } else {
                res.render("html/landing.hbs");
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
        const nusername = cookies.decrypt(username);
        const nroll = cookies.decrypt(rollno,res,req);
        getUsername(nusername,nroll,res)        
    } else {
        res.render("html/landing.hbs");
    }
}

module.exports = cookies_manager;
