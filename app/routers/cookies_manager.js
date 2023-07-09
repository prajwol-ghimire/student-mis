let express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt")
const mysql = require("./connection").con


async function compareCookie(username,rollno,nonhashedroll,nonhashedusername,permission,res) {
    const intexamroll = nonhashedroll.toString();
    const user_name = await bcrypt.compare(nonhashedusername, username);
    const roll_no = await bcrypt.compare(intexamroll, rollno);
    if (user_name && roll_no){

        const query = `SELECT otp_verified from user_infos where sid = ?`;
        mysql.query(query, nonhashedroll, (err, results) => {
            if(err) throw err
            else{  
                if (results.length > 0) {
                    const otpverified = results[0].otp_verified;
                    if (otpverified){
                        res.render("landing.hbs", {otpnotverified : false, cookies : true, rollno : nonhashedroll, user_name : nonhashedusername, permission : permission}); 
                    }
                    else{
                        res.render("landing.hbs", {otpnotverified : true, cookies : true, rollno : nonhashedroll, user_name : nonhashedusername, permission : permission}); 
                    }
                } else {
                    res.render('login.hbs', {nosuchuser : true})  
                }
            }
        });

            
    }
    else{
        res.render("landing.hbs"); 
    }
}

function getUsername(username,rollno,nonhashedroll,res) {
    let qry = "select username from user_infos where sid = ?";
    mysql.query(qry, nonhashedroll, (err, recivedresults) => {   
        if(err) throw err
        else{  
            if (recivedresults.length > 0) {
                const nonhashedusername = recivedresults[0].username;
                const permission = recivedresults[0].permission_type;
                compareCookie(username,rollno,nonhashedroll,nonhashedusername,permission,res);    
            }else {
                res.render("landing.hbs"); 
            }
        }
    });
}

function cookie_manager(req, res) {
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
        let nusername  = decodeURIComponent(username)
        let npassword =decodeURIComponent(rollno)
        let qry = "select sid from user_cookies where username_cookie = ?";
        mysql.query(qry, nusername, (err, recivedresults) => {   
            if(err) throw err
            else{  
                if (recivedresults.length > 0) {
                    const nonhashedroll = recivedresults[0].sid;
                    getUsername(nusername,npassword,nonhashedroll,res);       
                }else {
                   
                    res.render("landing.hbs"); 
                }

            }
        });
    
    } else {
        res.render("landing.hbs"); 
    }
}

module.exports = cookie_manager;