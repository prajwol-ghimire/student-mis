const { check, validationResult } = require('express-validator');
const mysql = require("./connection").con;
const bcrypt = require("bcrypt");

// Function to hash the new password and update it in the database
async function hashNewPass(req, res, sid, newpass) {
    try {
        const hashedpassword = await bcrypt.hash(newpass, 10);
        const query = `UPDATE user_infos SET password = '`+ hashedpassword +`' WHERE sid = '` + sid +`'`;
        mysql.query(query, (err, results) => {
            if (err) {
                // Update reset_token_temp to 'none' in case of an error
                const query = `UPDATE user_cookies SET reset_token_temp = 'none' WHERE sid = '` + sid +`'`;
                mysql.query(query, (err, results) => {
                    if (err) {
                        res.render("login.hbs");
                    } else {
                        res.render("login.hbs");
                    }
                });
            } else {
                res.render("login.hbs");
            }
        });
    } catch (error) {
        res.render("login.hbs");
    }
}

// Function to handle the change password request
function change_password(req, res) {
    const token = req.body.token_value;
    const newpass = req.body.changed_password;
    const query = `SELECT sid from user_cookies where reset_token_temp = ?`;
    mysql.query(query, token, (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {
                const sid = results[0].sid;
                hashNewPass(req, res, sid, newpass);
            } else {
                res.render('password_reset.hbs', { error500: true });
            }
        }
    });
}

module.exports = change_password;
