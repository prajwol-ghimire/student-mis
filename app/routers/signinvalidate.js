const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer")
const { await } = require('await')


// Generate a random job title


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
                res.render('signup.hbs', {error500insert : true})
            }else{
                res.redirect('/viewsusers');
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

async function storeCookie(res, username, examroll, email) {
    const intexamroll = examroll.toString();
    const hashedusername = await bcrypt.hash(username, 5);
    const hashedsid = await bcrypt.hash(intexamroll, 5);
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    res.cookie("_user_auth", hashedusername,
        { 
            expires: new Date(Date.now() + oneDayMilliseconds), 
            secure: true,
            sameSite: 'strict',
            path: '/',
        }
    );
    res.cookie(
        "_user_sid", hashedsid,
        { 
            expires: new Date(Date.now() + oneDayMilliseconds),
            secure: true,
            sameSite: 'strict',
            path: '/',
        }
    );
    const query = `UPDATE user_cookies SET username_cookie = '`+ hashedusername +`', sid_cookie = '`+ hashedsid +`' WHERE sid = '` + examroll +`'`;
    mysql.query(query, (err, results) => {
    if (err) {
        console.error('Error inserting data: ', err);
    }else{
        // const query = `UPDATE user_cookies SET username_cookie = '`+ hashedusername +`', sid_cookie = '`+ hashedsid +`' WHERE sid = '` + examroll +`'`;
        const query = `SELECT otp_verified from user_infos where sid = ?`;
        mysql.query(query, examroll, (err, results) => {
            if(err) throw err
            else{  
                if (results.length > 0) {
                    const otpverified = results[0].otp_verified;
                    if (otpverified){
                        res.render('landing.hbs', {otpnotverified : false})  
                    }
                    else{
                        sendOTPVerification(examroll, email, res)
                        res.render('landing.hbs', {otpnotverified : true})  
                    }
                } else {
                    res.render('login.hbs', {nosuchuser : true})  
                }
            }
        });
            // res.redirect('/');
    }
    });     
}

async function checksignin(res, plaintextPassword, hashedpassword, recivedresults) {
    const result = await bcrypt.compare(plaintextPassword, hashedpassword);
    if (result){
        const extractedData = recivedresults.map(row => {
            const username = row.username;
            const examroll = row.sid;
            const email = row.email;
            storeCookie(res, username, examroll, email)
        });
    }else{
        res.render('index.hbs', {incorrectpass : true})  
    }
}


function signinValidate(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('index.hbs', {
            alert
        })
    }else{
        const user_name = req.body.user_name;
        const plaintextPassword = req.body.passwd;
        let qry = "select * from user_infos where username = ?";
        mysql.query(qry, user_name, (err, recivedresults) => {   
            if(err) throw err
            else{  
                if (recivedresults.length > 0) {
                    const hashedpassword = recivedresults[0].password;
                    checksignin(res, plaintextPassword, hashedpassword, recivedresults);   
                } else {
                    res.render('login.hbs', {nosuchuser : true})  
                }
            }
        });


       
    }
}

module.exports = signinValidate;