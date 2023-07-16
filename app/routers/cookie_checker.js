const express = require('express');
const app = express();
const mysql = require("./connection").con;

function cookie_checker(req, res){
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
        let nusername = decodeURIComponent(username)
        let nrollno = decodeURIComponent(rollno)
        let qry = "select sid from user_cookies where username_cookie = ?";
        mysql.query(qry, nusername, (err, recivedresults) => {
            if (err) throw err;
            else {
                if (recivedresults.length > 0) { 
                    rollno = recivedresults[0].sid
                    let qry = "select * from user_infos where sid = ?";   
                    mysql.query(qry, rollno, (err, recivedresults) => {
                        if (err) throw err;
                        else { 
                           
                            permission = recivedresults[0].permission_type
                            console.log(permission)
                            return "Administrator"
                        }
                    });
                } else {
                    return false
                }
            }
        });
    } else {
        return false
    }
}

module.exports = cookie_checker;