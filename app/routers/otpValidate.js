const mysql = require("./connection").con;
const bcrypt = require("bcrypt");

/**
 * Compares the provided OTP value with the hashed OTP stored in the database
 * @param {string} hashedotp - Hashed OTP value stored in the database
 * @param {string} otpvalue - OTP value provided by the user
 * @param {Object} res - Response object
 * @param {string} sid_user - User's SID
 * @param {string} username - User's username
 * @param {string} permission - User's permission
 */
async function compareOTP(hashedotp, otpvalue, res, sid_user, username, permission) {
    const result = await bcrypt.compare(otpvalue, hashedotp);
    if (result) {
        const query = `UPDATE user_infos SET otp_verified = '` + 1 + `' WHERE sid = '` + sid_user + `'`;
        mysql.query(query, (err, results) => {
            if (err) {
                console.error('Error inserting data: ', err);
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.render("html/landing.hbs", { otpwrong: true, otpnotverified: true, cookies: true, rollno: sid_user, user_name: username, permission: permission });
    }
}

/**
 * Validates and verifies the OTP provided by the user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function otpValidate(req, res) {
    const otpvalue = req.body.otpvalue;
    const sid_user = req.body.rollno;
    const username = req.body.username;
    const permission = req.body.permission;

    let qry = "select otp_temp from user_infos where sid = ?";
    mysql.query(qry, sid_user, (err, recivedresults) => {
        if (err) throw err;
        else {
            const extractedData = recivedresults.map(row => {
                const hashedotp = row.otp_temp;
                compareOTP(hashedotp, otpvalue, res, sid_user, username, permission);
            });
        }
    });
}

module.exports = otpValidate;
