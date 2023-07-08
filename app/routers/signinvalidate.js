const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");


// https://www.youtube.com/watch?v=RNyNttTFQoc

async function checksignin(res, plaintextPassword, hashedpassword, recivedresults) {
    const result = await bcrypt.compare(plaintextPassword, hashedpassword);
    if (result){
        const extractedData = recivedresults.map(row => {
            const sid = row.sid;
            const username = row.username;
            res.cookie(sid, username);
            res.render("landing.hbs");
        });
    }else{
        res.render('index.hbs', {incoorectpass : true})  
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
                    res.render('index.hbs', {nosuchuser : true})  
                }
            }
        });


       
    }
}

module.exports = signinValidate;