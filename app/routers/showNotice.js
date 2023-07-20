const express = require('express');
const mysql = require("./connection").con;
const cookies = require('./cookieEnDc.js')

function showNotice(req, res){
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
        const rollno = cookies.decrypt(hrollno);
        let qry = "select * from user_infos where sid = ?";   
        mysql.query(qry, rollno, (err, recivedresults) => {
            if (err) throw err;
            else {
                permission = recivedresults[0].permission_type
                if (permission == "Student" || permission == "Administrator"){
                    let qry = "select * from notice_data ORDER BY id DESC";   
                    mysql.query(qry, rollno, (err, recivedresults) => {
                        if (err) throw err;
                        else {
                            res.render("html/notice.hbs",{notice: recivedresults, permission:permission})                                     
                        }
                    });
                }else{
                    res.redirect("/");
                }
            }
        });
        
    } else {
        res.redirect("/")
    }
            
}

module.exports = showNotice;