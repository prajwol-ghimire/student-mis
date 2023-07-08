const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const { await } = require('await')


let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth : {
        user : "aualcar157@outlook.com",
        pass : "aspire5610",
    },
})

const sendOTPVerification = async (examroll, email, res) => {
    try{
        const otp = `${Math.floor(10000 + Math.random() * 90000)}`;
        const mailOptions = {
            from: "aualcar157@outlook.com",
            to: email,
            subject: "Verify Your Email",
            html : `<p> Enter ${otp} in the app to verify email address and complete the signup`,
        };

        const saltRounds = 7;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        // await transporter.sendMail(mailOptions)
        console.log(otp)
        const query = `UPDATE user_infos SET otp_temp = '`+ hashedOTP +`' WHERE sid = '` + examroll +`'`;
        mysql.query(query, (err, results) => {
            if (err) {
                console.error('Error inserting data: ', err);
                res.render('index.hbs', {error500insert : true})
            }else{
                res.render("otpverify.hbs", {sid : examroll}) 
            }
        });
    }
    catch(error){
        res.json({
            status : "FAILED",
            message : error.message,
        });
    }

}


async function signUpSQL(res, examroll, username, email, plaintextPassword) {
    const hashedpassword = await bcrypt.hash(plaintextPassword, 10);
    let qry = "select * from user_infos where sid = ?";
    mysql.query(qry, examroll, (err, results) => {
        if(err) throw err
        else{
            if (results.length > 0) {
                res.render('index.hbs', {alreadySignedup : true})
            } else {
                const query = `INSERT INTO user_infos (sid, username, email, password, otp_verified) VALUES ('` + examroll + `','`+ username +`','`+ email +`','`+ hashedpassword + `','`+ 0 +`')`;
                mysql.query(query, (err, results) => {
                if (err) {
                    console.error('Error inserting data: ', err);
                    res.render('index.hbs', {error500insert : true})
                }else{
                    const query = `INSERT INTO user_cookies (sid) VALUES ('` + examroll + `')`;
                    mysql.query(query, (err, results) => {
                    if (err) {
                        console.error('Error inserting data: ', err);
                        res.render('index.hbs', {error500insert : true})
                    }else{
                        sendOTPVerification(examroll,email, res)
                    }
                    });          
                }
                });     
            }
        }
    });
}



function validateEmail(email) {
    const parts = email.split("@");
    if (parts.length !== 2) {
      return false;
    }
    const [username, domain] = parts;
    const usernameParts = username.split(".");
    if (usernameParts.length !== 2) {
      return false;
    }
    if (!(/^[a-z]/.test(usernameParts[0]))) {
      return false;
    }
    if (!(/^[0-9]/.test(usernameParts[1]))) {
        return false;
    }
    const domainParts = domain.split(".");
    if (domainParts.length < 3 || domainParts[domainParts.length - 1] !== "np") {
      return false;
    }
    if (
      domainParts[domainParts.length - 2] !== "edu" ||
      domainParts[domainParts.length - 3] !== "ncit"
    ) {
      return false;
    }
    return true;
}
  

function signupValidate(req, res) {
    
    const email = req.body.email;
    const isValid = validateEmail(email);
    console.log(isValid);
    if (isValid){
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const alert = errors.array()
            res.render('index.hbs', {
                alert
            })
        }else{
            const examroll = req.body.examroll;
            const username = req.body.txt;
            const email = req.body.email;
            const plaintextPassword = req.body.pswd;
            signUpSQL(res, examroll, username, email, plaintextPassword);
        }
    }else{
        //show here email not valid wala step
    }
}

module.exports = signupValidate;
