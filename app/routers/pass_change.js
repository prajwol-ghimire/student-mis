const cookies = require('./cookieEnDc.js')
const mysql = require("./connection").con;

function pass_change(req, res) {
    const rawCookieHeader = req.header('Cookie');
    let username = null;
    let hrollno = null;
    
    if (rawCookieHeader) {
        const cookies = rawCookieHeader.split('; ');
    
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
    
            if (cookieName === '_user_auth') {
                username = cookieValue;
            } else if (cookieName === '_user_sid') {
                hrollno = cookieValue;
            }
        }
    }
    
    if (username && hrollno) {
        const rollno = cookies.decrypt(hrollno,res,req);
        let qry = "select * from user_infos join user_data on user_infos.sid=user_data.sid where user_infos.sid = '"+ rollno +"' ";   
        mysql.query(qry, (err, recivedresults) => {
            if (err) throw err;
            else { 
                if(recivedresults.length > 0){
                    permission = recivedresults[0].permission_type
                    if (permission == "Student" || permission == "Administrator"){
                        fullname = recivedresults[0].username                            
                        user_image=recivedresults[0].user_image
                        newpass = req.body.password;
                        let qry = `UPDATE user_infos SET password = '${newpass}' WHERE sid = '${rollno}'`
                        mysql.query(qry, rollno, (err, recivedresults) => {
                            if (err) throw err;
                            else {
                                res.render("html/pass_change.hbs",{permission:permission, username: fullname, photo:user_image, changed : true})                                     
                            }
                        });
                    }else{
                        res.redirect("/"); 
                    }
                }else{
                    res.redirect("/");
                }
            }
        });
        
    } else {
        res.redirect("/")
    }

}


module.exports = pass_change;