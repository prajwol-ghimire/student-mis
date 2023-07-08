const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")


async function checksignin(res, plaintextPassword, hashedpassword) {
    const result = await bcrypt.compare(plaintextPassword, hashedpassword);
    res.render("upload.hbs")
}


function signinValidate(req, res) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const alert = errors.array()
        res.render('index.hbs', {
            alert
        })
    }else{
        const email = req.body.u_email;
        const plaintextPassword = req.body.passwd;
        let qry = "select * from user_infos where email = ?";
        mysql.query(qry, email, (err, recivedresults) => {   
            if(err) throw err
            else{  
                if (recivedresults.length > 0) {
                    const hashedpassword = recivedresults[0].password;
                    checksignin(res, plaintextPassword, hashedpassword);   
                } else {
                    res.render('index.hbs', {nosuchemail : true})
                    
                }
            }
        });


       
    }
}

module.exports = signinValidate;