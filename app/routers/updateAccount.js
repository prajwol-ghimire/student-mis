const mysql = require("./connection").con;

function updateAccount(req, res){
    var firstName = req.body.firstName
    var middleName = req.body.middleName
    var lastName = req.body.lastName
    var sid = req.body.rollNo
    var email = req.body.email
    var usernames = firstName + " " + middleName + " "  + lastName
    console.log(sid)
    let qry = `UPDATE user_infos SET username = '`+ usernames +`' WHERE sid = ?`
    mysql.query(qry, sid, (err, recivedresults) => {
        if (err) throw err;
        else {
            res.render("student/html/account_setting.hbs",{username : usernames, email : email, rollno : sid})
        }
    });
}

module.exports = updateAccount