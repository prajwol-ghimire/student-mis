const mysql = require("./connection").con;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cookies = require('./cookieEnDc.js')
 
// Nodemailer transporter
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: "student_mis.ncit@outlook.com",
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
                  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">asda${otp}</h2>
                  <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Student-MIS</p>
                    <p>Nepal College of Information Technology</p>
                    <p>Balkumari Lalitpur</p>
                  </div>
                </div>
            </div>`,
    };

    const saltRounds = 7;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    await transporter.sendMail(mailOptions)
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
  const hashedsid = cookies.encrypt(intexamroll);
  const hashedusername = cookies.encrypt(username);
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  res.cookie("_user_auth", hashedusername, {
    expires: new Date(Date.now() + oneDayMilliseconds),
    sameSite: 'strict',
    path: '/',
  })
  res.cookie("_user_sid", hashedsid, {
    expires: new Date(Date.now() + oneDayMilliseconds),
    sameSite: 'strict',
    path: '/',
  })
  res.redirect("/");  
}

// Helper function to check signin
async function checksignin(res, plaintextPassword, hashedpassword, recivedresults) {
  const result = await bcrypt.compare(plaintextPassword, hashedpassword);
  if (result) {
    const extractedData = recivedresults.map(row => {
      const username = row.username;
      const examroll = row.sid;
      storeCookie(res, username, examroll);
    });
  } else {
    res.render('html/login.hbs', { incorrectpass: true });
  }
}

module.exports = signinValidate;