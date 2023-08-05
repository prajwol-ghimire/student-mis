const mysql = require("./connection").con;
const { await } = require('await');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

// Create a nodemailer transporter
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth : {
        user: "student_mis.ncit@outlook.com",
        pass: "Mis@123sTudent!",
    },
});

/**
 * Generates a random string of the specified length
 * @param {number} length - Length of the random string to generate
 * @returns {string} - Randomly generated string
 */
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@@';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}

/**
 * Sends a reset password link to the user's email address
 * @param {string} user_email - User's email address
 * @param {Object[]} recivedresults - Array of user information from the database
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function send_Reset_Password(user_email, recivedresults, req, res) {
    const token = generateRandomString(80);
    const mailOptions = {
        from: "student_mis.ncit@outlook.com",
        to: user_email,
        subject: "Reset Password Link - Student MIS",
        html: `'
        
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Student-MIS</a>
        </div>
        <p>Click here <br> http://localhost:8080/reset-password?token=` + token + `><br> to reset password  of your Student-MIS account.</p>
       

        <p style="font-size:0.9em;">Regards,<br />Student-MIS<br />Nepal College of Information Technology<br />Balkumari, Lalitpur</p>
        <hr style="border:none;border-top:1px solid #eee" />
        </div>
        </div>'
        `,
    };
    const html = '<p>You requested for reset password, kindly use this <a href="http://localhost:8080/reset-password?token=' + token + '">link</a> to reset your password</p>';
    console.log(html)
    const sid = recivedresults[0].sid;
    nowdate = Date.now();
    requesteddate = Date.now() + 3600 * 1000;
    const query = `UPDATE user_cookies SET reset_token_temp = '` + token + `', reset_token_time = '` + requesteddate + `' WHERE sid = '` + sid + `'`;
    mysql.query(query, (err, results) => {
        if (err) {
            res.render('html/password_reset.hbs', { error500: true });
        } else {
            res.redirect("/password_reset?sucess=hasbeensent")
        }
    });
    await transporter.sendMail(mailOptions);

}

/**
 * Resets the user's password by sending a reset link to their email
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function reset_password(req, res) {
    const user_email = req.body.user_email;
    const query = `SELECT * from user_infos where email = ?`;
    mysql.query(query, user_email, (err, recivedresults) => {
        if (err) throw err;
        else {
            if (recivedresults.length > 0) {
                send_Reset_Password(user_email, recivedresults, req, res);
            } else {
                res.render('html/password_reset.hbs', { nosuchuser: true });
            }
        }
    });
}


module.exports = reset_password;
