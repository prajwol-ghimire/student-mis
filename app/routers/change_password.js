const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const { await } = require('await')
const bcrypt = require("bcrypt")

async function hashNewPass(req, res, sid, newpass){
    const hashedpassword = await bcrypt.hash(newpass, 10);
    const query = `UPDATE user_infos SET password = '`+ hashedpassword +`' WHERE sid = '` + sid +`'`;
    mysql.query(query, (err, results) => {
        if (err) {
            const query = `UPDATE user_cookies SET reset_token_temp = 'none' WHERE sid = '` + sid +`'`;
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
                const sid = results[0].sid;
                hashNewPass(req, res, sid, newpass);
            } else {
                res.render('password_reset.hbs', {error500 : true})
            }
        }
    });  
}

module.exports = change_password