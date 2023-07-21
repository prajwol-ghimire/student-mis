const mysql = require("./connection").con;
const path = require('path');

function updateAccount(req, res){
    var username = req.body.username
    var sid = req.body.sid
    if(sid == 1){
        res.redirect("/profile-setting?error=master")
    } else{
        if (req.file){
            files = req.file.path
            let qry = `UPDATE user_infos SET username = '`+ username +`' WHERE sid = ?`
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
            let qry = `UPDATE user_infos SET username = '`+ username +`' WHERE sid = ?`
            mysql.query(qry, sid, (err, recivedresults) => {
                if (err) throw err;
                else {
                    res.redirect("/profile-setting")
                }
            });
        }
    }
        
   
    
   
}

module.exports = updateAccount