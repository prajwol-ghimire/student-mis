const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const { await } = require('await')
const nodemailer = require("nodemailer")
const crypto = require('crypto');

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth : {
        user : "aualcar157@outlook.com",
        pass : "aspire5610",
    },
})

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@@';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}

async function send_Reset_Password(user_email,recivedresults,req, res) {
    const token = generateRandomString(80);
    const mailOptions = {
        from: "aualcar157@outlook.com",
        to: user_email,
        subject: "Reset Password Link - Student MIS ",
        html : `'<p>You requested for reset password, kindly use this 
        <a href="http://localhost:8080/reset-password?token=` + token + `">link</a> to reset your password</p>'
        `,
    };
    const html = '<p>You requested for reset password, kindly use this <a href="http://localhost:8080/reset-password?token=' + token + '">link</a> to reset your password</p>';
    // await transporter.sendMail(mailOptions)
    const sid = recivedresults[0].sid;
    console.log(sid)
    console.log(html)
    nowdate = Date.now()
    requesteddate = Date.now() + 3600 * 1000
    console.log(nowdate)
    console.log(requesteddate)
    const query = `UPDATE user_cookies SET reset_token_temp = '`+ token +`', reset_token_time = '`+ requesteddate +`' WHERE sid = '` + sid +`'`;
    console.log(query)
    mysql.query(query, (err, results) => {
        if (err) {
            res.render('password_reset.hbs', {error500 : true})
        }else{
            res.render('password_reset.hbs', {hasbeensent : true}) 
        }
    });
}

function reset_password(req, res) {
    const user_email = req.body.user_email;    
    const query = `SELECT * from user_infos where email = ?`;
    mysql.query(query, user_email, (err, recivedresults) => {
        if(err) throw err
        else{  
            if (recivedresults.length > 0) {
                send_Reset_Password(user_email,recivedresults,req, res);
            } else {
                res.render('password_reset.hbs', {nosuchuser : true})  
            }
        }
    });
}

module.exports = reset_password
