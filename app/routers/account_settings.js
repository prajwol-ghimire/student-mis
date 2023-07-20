const mysql = require("./connection").con;
const cookies = require('./cookieEnDc.js')

function account_settings(req, res){
    const rawCookieHeader = req.header('Cookie');
    let username = null;
    let rollno = null;
    if (rawCookieHeader) {
        const cookies = rawCookieHeader.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
    
            if (cookieName === '_user_auth') {
                username = cookieValue;
            } else if (cookieName === '_user_sid') {
                rollno = cookieValue;
            }
        }
    } 
    if (username && rollno) {
        const nroll = cookies.decrypt(rollno);
        let qry = "select * from user_infos where sid = ?";   
        mysql.query(qry, nroll, (err, recivedresults) => {
            if (err) throw err;
            else {
                username = recivedresults[0].username
                email = recivedresults[0].email
                permission = recivedresults[0].permission_type
                let qry = "select * from user_data where sid = ?";   
                mysql.query(qry, nroll, (err, recivedresults) => {
                    if (err) throw err;
                    else {
                        photo = recivedresults[0].user_image
                        crn = recivedresults[0].crn
                        res.render("html/account_setting.hbs",{username : username, email : email, rollno : nroll, crn : crn, photo : photo, permission: permission})
                    }
                });   
                
            }
        });
    }               
}

module.exports = account_settings;