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
    user: "Mis@123sTudent!@outlook.com",
    pass: "Mis@123sTudent!",
  },
});

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
  const usernameParts = username.split(".");
  if (usernameParts.length !== 2) {
      return false;
  }
  if (!/^[a-z]/.test(usernameParts[0])) {
      return false;
  }
  if (!/^[0-9]/.test(usernameParts[1])) {
      return false;
  }
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
 * Validate email address format
 * @param {string} variable - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function isStringInt(variable) {
  const regex = /^[a-zA-Z]+\.\d+$/;
  return regex.test(variable);
}

// Signin validation function
function signinValidate(req, res) {
  const user_email = req.body.user_email;
  const plaintextPassword = req.body.passwd;
  const isValid = validateEmail(user_email);
  if (isValid) {
    let qry = "select * from user_infos where email = ?";
    mysql.query(qry, user_email, (err, recivedresults) => {
      if (err) throw err;
      else {
        if (recivedresults.length > 0) {
          const hashedpassword = recivedresults[0].password;
          checksignin(res, plaintextPassword, hashedpassword, recivedresults);
        } else {
          res.redirect("/login?error=nosuchuser")
        }
      }
    });
  }else{
    if (isStringInt) {
      newuser_email = user_email + "@ncit.edu.np"
      let qry = "select * from user_infos where email = ?";
      mysql.query(qry, newuser_email, (err, recivedresults) => {
        if (err) throw err;
        else {
          if (recivedresults.length > 0) {
            const hashedpassword = recivedresults[0].password;
            checksignin(res, plaintextPassword, hashedpassword, recivedresults);
          } else {
            res.redirect("/login?error=nosuchuser")
          }
        }
      });
    }
    else{
      res.redirect("/login?error=nosuchuser")
    } 
  }
}

// Helper function to send OTP verification email
const sendOTPVerification = async (examroll, email, res) => {
  try {
    const otp = `${Math.floor(10000 + Math.random() * 90000)}`;
    const mailOptions = {
      from: "Mis@123sTudent!@outlook.com",
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