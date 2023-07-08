const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");


// https://www.youtube.com/watch?v=RNyNttTFQoc'
async function storeCookie(res, username, examroll) {
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
        res.redirect('/');
    }
    });     
}

async function checksignin(res, plaintextPassword, hashedpassword, recivedresults) {
    const result = await bcrypt.compare(plaintextPassword, hashedpassword);
    if (result){
        const extractedData = recivedresults.map(row => {
            const username = row.username;
            const examroll = row.sid;
            storeCookie(res, username, examroll)
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