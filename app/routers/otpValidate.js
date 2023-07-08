const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const { await } = require('await')

async function compareOTP(hashedotp, otpvalue, res, sid_user) {
    const result = await bcrypt.compare(otpvalue, hashedotp);
    if (result){
        const query = `UPDATE user_infos SET otp_verified = '`+ 1 +`' WHERE sid = '` + sid_user +`'`;
        mysql.query(query, (err, results) => {
            if (err) {
                console.error('Error inserting data: ', err);
                res.render("otpverify.hbs", {error500insert : true})
            }else{
                res.render("index.hbs")
            }
        });
       
    }else{
        res.render("otpverify.hbs", {wrongvalue : true,sid : sid_user})
    }
}

function otpValidate(req, res) {
    const otpvalue = req.body.otpvalue;
    const sid_user = req.body.sid_user;
    // if (otpvalue == null && sid_user == null){
        let qry = "select otp_temp from user_infos where sid = ?";
        mysql.query(qry, sid_user, (err, recivedresults) => {   
            if(err) throw err
            else{  
                const extractedData = recivedresults.map(row => {
                    const hashedotp = row.otp_temp;
                    compareOTP(hashedotp,otpvalue,res,sid_user);       
                });
            }
        });
    // }
    // else{
    //     res.render("otpverify.hbs", {blankvalue : true, sid : sid_user})
    // }
}

module.exports = otpValidate;