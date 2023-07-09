const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
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



async function sendUserDetails(examroll,email, password,username,res){
        const mailOptions = {
            from: "aualcar157@outlook.com",
            to: email,
            subject: "STUDENT MIS REGISTRATION",
            html : `<p> Use the following credentials to login : url dinu parxa
            <p>
            examroll :  ${examroll} <br>
            email :  ${email} <br>
            username : ${username} <br>
            password : ${password} <br>
            `,
        };
        console.log(password);
        // await transporter.sendMail(mailOptions)
        res.redirect('/viewsusers');
}


async function signUpSQL(res, examroll, username, email, permission) {

    min = Math.ceil(11111);
    max = Math.floor(999999);
    const randomnum1 =  Math.floor(Math.random() * (max - min)) + min;
    const randomnum2 =  Math.floor(Math.random() * (max - min)) + min;
    plaintextPassword = randomnum1 + "@ncit!" + randomnum2
    const hashedpassword = await bcrypt.hash(plaintextPassword, 10);
    let qry = "select * from user_infos where sid = ?";
    mysql.query(qry, examroll, (err, results) => {
        if(err) throw err
        else{
            if (results.length > 0) {
                res.render('signup.hbs', {alreadySignedup : true})
            } else {
                const query = `INSERT INTO user_infos (sid, username, email, password, otp_verified, permission_type) VALUES ('` + examroll + `','`+ username +`','`+ email +`','`+ hashedpassword + `','`+ 0 +`','`+ permission +`')`;
                mysql.query(query, (err, results) => {
                if (err) {
                    console.error('Error inserting data: ', err);
                    res.render('signup.hbs', {error500insert : true})
                }else{
                    const query = `INSERT INTO user_cookies (sid) VALUES ('` + examroll + `')`;
                    mysql.query(query, (err, results) => {
                    if (err) {
                        console.error('Error inserting data: ', err);
                        res.render('signup.hbs', {error500insert : true})
                    }else{
                        sendUserDetails(examroll,email, plaintextPassword,username,res)
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
    if (isValid){
            const sid = req.body.examroll;
            const username = req.body.username;
            const permission = req.body.permission_type;
            signUpSQL(res, sid, username, email,permission);
        }
    else{
        //show here email not valid wala step
    }
}

module.exports = signupValidate;
