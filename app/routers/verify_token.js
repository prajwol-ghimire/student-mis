const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const { await } = require('await')

function verify_password_token(req, res){
    const token = req.query.token;
    const query = `SELECT sid from user_cookies where reset_token_temp = ?`;
    mysql.query(query, token, (err, results) => {
        if(err) throw err
        else{  
            if (results.length > 0) {
                const sid = results[0].sid;
                res.render('password_change.hbs', {token : token})
            } else {
                res.render('password_reset.hbs', {error500 : true})
            }
        }
    });
    
}


module.exports = verify_password_token