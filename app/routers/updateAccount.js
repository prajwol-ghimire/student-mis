const mysql = require("./connection").con;

function updateAccount(req, res){
    var sid = req.body.rollNo
    var email = req.body.email
    var username =req.body.username
    console.log(sid)
    let qry = `UPDATE user_infos SET username = '`+ username +`' WHERE sid = ?`
    mysql.query(qry, sid, (err, recivedresults) => {
        if (err) throw err;
        else {
            res.render("student/html/account_setting.hbs",{username : username, email : email, rollno : sid})
        }
    });
}

module.exports = updateAccount