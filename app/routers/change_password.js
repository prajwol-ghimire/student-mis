const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const { await } = require('await')
const bcrypt = require("bcrypt")
const crypto = require('crypto');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@@';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}

async function hashNewPass(req, res, sid, newpass){
    const token = generateRandomString(80);
    const hashedpassword = await bcrypt.hash(newpass, 10);
    const crypto = require('crypto');
    const query = `UPDATE user_infos SET password = '`+ hashedpassword +`' WHERE sid = '` + sid +`'`;
    mysql.query(query, (err, results) => {
        if (err) {
            const query = `UPDATE user_cookies SET reset_token_temp = '`+ token +`' WHERE sid = '` + sid +`'`;
            mysql.query(query, (err, results) => {
                if (err) {
                    res.render("login.hbs");   
                }else{
                    res.render("login.hbs"); 
                }
            });
        }else{
            res.render("login.hbs"); 
        }
    });
}

function change_password(req, res) {
    const token = req.body.token_value;
    const newpass = req.body.changed_password
    const query = `SELECT sid from user_cookies where reset_token_temp = ?`;
    mysql.query(query, token, (err, results) => {
        if(err) throw err
        else{  
            if (results.length > 0) {
                console.log("yes")
                const sid = results[0].sid;
                hashNewPass(req, res, sid, newpass);
            } else {
                console.log("no")
                res.render('password_reset.hbs', {error500 : true})
            }
        }
    });
    
}

module.exports = change_password