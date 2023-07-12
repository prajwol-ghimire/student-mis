const { check, validationResult } = require('express-validator');
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const app = express();
const mysql = require("./connection").con;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Middleware setup
app.use(cookieParser());
app.use(session({
  secret: 'KEYSSPECIAL',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Nodemailer transporter
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: "aualcar157@outlook.com",
    pass: "aspire5610",
  },
});

// Signin validation function
function signinValidate(req, res) {
  const user_name = req.body.user_name;
  const plaintextPassword = req.body.passwd;
  let qry = "select * from user_infos where username = ?";
  mysql.query(qry, user_name, (err, recivedresults) => {
    if (err) throw err;
    else {
      if (recivedresults.length > 0) {
        const hashedpassword = recivedresults[0].password;
        checksignin(res, plaintextPassword, hashedpassword, recivedresults);
      } else {
        // req.flash('success', 'Please login first!');
        // res.redirect('/login');
        res.render('login.hbs', {nosuchuser : true})  
      }
    }
  });
}

// Helper function to send OTP verification email
const sendOTPVerification = async (examroll, email, res) => {
  try {
    const otp = `${Math.floor(10000 + Math.random() * 90000)}`;
    const mailOptions = {
      from: "aualcar157@outlook.com",
      to: email,
      subject: "Verify Your Email",
      html: `<p> Enter ${otp} in the app to verify your email address and complete the signup.</p>`,
    };

    const saltRounds = 7;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    // await transporter.sendMail(mailOptions)
    const query = `UPDATE user_infos SET otp_temp = '${hashedOTP}' WHERE sid = '${examroll}'`;
    mysql.query(query, (err, results) => {
      if (err) {
        console.error('Error inserting data: ', err);
        res.render('signup.hbs', { error500insert: true });
      } else {
        res.redirect('/');
      }
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// Helper function to store cookies
async function storeCookie(res, username, examroll, email) {
  const intexamroll = examroll.toString();
  const hashedusername = await bcrypt.hash(username, 5);
  const hashedsid = await bcrypt.hash(intexamroll, 5);
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  res.cookie("_user_auth", hashedusername, {
    expires: new Date(Date.now() + oneDayMilliseconds),
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
  res.cookie("_user_sid", hashedsid, {
    expires: new Date(Date.now() + oneDayMilliseconds),
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
  const query = `UPDATE user_cookies SET username_cookie = '${hashedusername}', sid_cookie = '${hashedsid}' WHERE sid = '${examroll}'`;
  mysql.query(query, (err, results) => {
    if (err) {
      console.error('Error inserting data: ', err);
    } else {
      const query = `SELECT otp_verified FROM user_infos WHERE sid = ?`;
      mysql.query(query, examroll, (err, results) => {
        if (err) throw err;
        else {
          if (results.length > 0) {
            const otpverified = results[0].otp_verified;
            if (otpverified) {
              res.redirect('/');
            } else {
              sendOTPVerification(examroll, email, res);
            }
          } else {
            res.render('landing.hbs', { nosuchuser: true });
          }
        }
      });
    }
  });
}

// Helper function to check signin
async function checksignin(res, plaintextPassword, hashedpassword, recivedresults) {
  const result = await bcrypt.compare(plaintextPassword, hashedpassword);
  if (result) {
    const extractedData = recivedresults.map(row => {
      const username = row.username;
      const examroll = row.sid;
      const email = row.email;
      storeCookie(res, username, examroll, email);
    });
  } else {
    res.render('login.hbs', { incorrectpass: true });
  }
}

module.exports = signinValidate;