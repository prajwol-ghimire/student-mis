const mysql = require("./connection").con;
const path = require('path');

function updateAccount(req, res){
    var firstName = req.body.firstName
    var middleName = req.body.middleName
    var lastName = req.body.lastName
    var sid = req.body.sid
    var email = req.body.email
    var usernames = firstName + " " + middleName + " "  + lastName
    if (req.file){
        files = req.file.path
        let qry = `UPDATE user_infos SET username = '`+ usernames +`' WHERE sid = ?`
        mysql.query(qry, sid, (err, recivedresults) => {
            if (err) throw err;
            else {
                const fileName = path.basename(files);
                let qry = `UPDATE user_data SET user_image = '`+ fileName + `' WHERE sid = ?`
                mysql.query(qry, sid, (err, recivedresults) => {
                    if (err) throw err;
                    else {
                        res.redirect("/profile-setting")
                    }
                    
                });
            }
        });
    }else{
        let qry = `UPDATE user_infos SET username = '`+ usernames +`' WHERE sid = ?`
        mysql.query(qry, sid, (err, recivedresults) => {
            if (err) throw err;
            else {
                res.redirect("/profile-setting")
            }
        });
    }
   
}

module.exports = updateAccount