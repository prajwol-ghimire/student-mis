const mysql = require("./connection").con;
const express = require('express');
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
        const nroll = cookies.decrypt(rollno,res,req);
        let qry = "select * from user_infos join user_data on user_infos.sid=user_data.sid where user_infos.sid = '"+ nroll +"' ";   
        mysql.query(qry, (err, recivedresults) => {
            if(recivedresults.length > 0){
                username = recivedresults[0].username
                email = recivedresults[0].email
                permission = recivedresults[0].permission_type   
                photo = recivedresults[0].user_image
                crn = recivedresults[0].crn
                res.render("html/account_setting.hbs",{username : username, email : email, rollno : nroll, crn : crn, photo : photo, permission: permission}) 
            }else{
                res.redirect("/")
            }
        });   
                
    }
       
}               


module.exports = account_settings;