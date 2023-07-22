const mysql = require("./connection").con;
const path = require('path');

function updateAccount(req, res){
    var username = req.body.username
    var semester = req.body.semester
    var registration = req.body.registration
    var sid = req.body.sid
    var faculty = req.body.faculty
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
                    let qry = `UPDATE user_data SET user_image = '`+ fileName + `',semester = '`+ semester +`', registration='`+ registration +`' WHERE sid = ?`
                    mysql.query(qry, sid, (err, recivedresults) => {
                        if (err) throw err;
                        else {
                            res.redirect("/profile-setting")
                        }
                        
                    });
                }
            });
        }else{
            let qry = `UPDATE user_infos SET username = ? WHERE sid = ?`
                    // 1; const nqry = `select * from user_infos`; //
            mysql.query(qry,  [username, sid], (err, recivedresults) => {
                if (err) throw err;
                else {
                    let qry = `UPDATE user_data SET semester = ?, registration= ? WHERE sid = ?`
                    mysql.query(qry, [semester,registration, sid], (err, recivedresults) => {
                        if (err) throw err;
                        else {
                            res.redirect("/profile-setting")
                        }
                
                    });
                }
            });
        }
    }
        
   
    
   
}

module.exports = updateAccount