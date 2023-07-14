const express = require('express');
const app = express();
const mysql = require("./connection").con;

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
                            username = recivedresults[0].username
                            email = recivedresults[0].email
                            let qry = "select * from user_data where sid = ?";   
                            mysql.query(qry, rollno, (err, recivedresults) => {
                                if (err) throw err;
                                else {
                                    photo = recivedresults[0].user_image
                                    crn = recivedresults[0].crn

                                    const words = username.split(' ');
                                    let firstName, middleName, lastName;
                                    if (words.length === 3) {
                                        [firstName, middleName, lastName] = words;
                                    } else if (words.length === 2) {
                                        [firstName, lastName] = words;
                                    }
                                    res.render("student/html/account_setting.hbs",{firstName : firstName,middleName : middleName,lastName : lastName, email : email, rollno : rollno, crn : crn, photo : photo})
                                }
                            });   
                           
                        }
                    });
                    
                } else {
                    res.redirect("/")
                }
            }
        });
    } else {
        res.redirect("/")
    }
}

module.exports = account_settings;