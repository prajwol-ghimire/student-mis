const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const { await } = require('await')

async function compareOTP(hashedotp, otpvalue, res, sid_user, username, permission) {
    console.log("here1")
    const result = await bcrypt.compare(otpvalue, hashedotp);
    if (result){
        const query = `UPDATE user_infos SET otp_verified = '`+ 1 +`' WHERE sid = '` + sid_user +`'`;
        mysql.query(query, (err, results) => {
            if (err) {
                console.error('Error inserting data: ', err);
                res.redirect('/');
            }else{
                res.redirect('/');
            }
        });
    }else{
        res.render("landing.hbs", {otpwrong: true, otpnotverified : true, cookies : true, rollno : sid_user, user_name : username, permission : permission}); 
    }
}

function otpValidate(req, res) {
    const otpvalue = req.body.otpvalue;
    const sid_user = req.body.rollno;
    const username = req.body.username;
    const permission = req.body.permission;
    // if (otpvalue == "" && sid_user == ""){
        let qry = "select otp_temp from user_infos where sid = ?";
        mysql.query(qry, sid_user, (err, recivedresults) => {   
            if(err) throw err
            else{  
                const extractedData = recivedresults.map(row => {
                    const hashedotp = row.otp_temp;
                    compareOTP(hashedotp,otpvalue,res,sid_user,username,permission);       
                });
            }
        });
    // }
    // else{
    //     res.render("landing.hbs", {otpnotverified : true, cookies : true, rollno : sid_user, user_name : username, permission : permission}); 
    // }
}

module.exports = otpValidate;