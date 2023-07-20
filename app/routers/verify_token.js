const { check, validationResult } = require('express-validator');
const mysql = require("./connection").con;
const { await } = require('await');

/**
 * Verify the password reset token and render the password change page if the token is valid
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function verify_password_token(req, res) {
    const token = req.query.token;
    if (token !== "none") {
        if (token != undefined){  
            const query = `SELECT sid from user_cookies where reset_token_temp = ?`;
            mysql.query(query, token, (err, results) => {
                if (err) throw err;
                else {
                    if (results.length > 0) {
                        const sid = results[0].sid;
                        res.render('html/password_change.hbs', { token: token });
                    } else {
                        res.render('html/password_reset.hbs', { error500: true });
                    }
                }
            });
        }else{
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
}

module.exports = verify_password_token;
