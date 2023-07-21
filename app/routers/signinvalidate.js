const mysql = require("./connection").con;
const bcrypt = require("bcrypt");
const cookies = require('./cookieEnDc.js')
 
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
function checkString(str) {
  value = str.includes("@ncit.edu.np");
  return value 
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
    if (!checkString(user_email)) {
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