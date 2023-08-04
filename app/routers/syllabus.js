const { check, validationResult } = require('express-validator');
const mysql = require("./connection").con;
const cookies = require('./cookieEnDc.js')



function getsyllabus(nonhashedroll,permission,fullname,user_image, res){
    let qry = "select * from user_data where sid = '"+ nonhashedroll +"' ";
    mysql.query(qry, (err, recivedresults) => {
        if (err) throw err;
        else { 
            if(recivedresults.length > 0){
                faculty = recivedresults[0].faculty
                semester = recivedresults[0].semester
                let qry = "select * from subject_data where semester = '"+ semester +"' and faculty = '" + faculty +"' ";
                mysql.query(qry, (err, recivedresults) => {
                    if (err) throw err;
                    else { 
                        if(recivedresults.length > 0){
                           res.render("html/view_syllabus.hbs",{permission:permission, username: fullname, photo:user_image, syllabus: recivedresults, faculty : faculty, semester : semester})
                        }else{
                            res.redirect("/")
                        }
                    }
                });
            }else{
                res.redirect("/")
            }
        }
    });

}


function syllabus(req, res) {
    const rawCookieHeader = req.header('Cookie');
    let rollno = null;

    if (rawCookieHeader) {
        const cookies = rawCookieHeader.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === '_user_sid') {
                rollno = cookieValue;
            }
        }
    }
   
    if (rollno) {
        const nonhashedroll = cookies.decrypt(rollno,res,req);
        let qry = "select * from user_infos join user_data on user_infos.sid=user_data.sid where user_infos.sid = '"+ nonhashedroll +"' ";   
        mysql.query(qry, (err, recivedresults) => {
            if (err) throw err;
            else { 
                if(recivedresults.length > 0){
                    permission = recivedresults[0].permission_type
                    fullname = recivedresults[0].username                            
                    user_image=recivedresults[0].user_image
                    getsyllabus(nonhashedroll,permission,fullname,user_image, res);
                }else{
                    res.redirect("/")
                }
            }
        });
    
      
    } else {
        res.render("html/login.hbs");
    }
}

module.exports = syllabus;
