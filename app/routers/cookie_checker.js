const express = require('express');
const app = express();
const mysql = require("./connection").con;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const examform = require('./examform.js')
const cookies = require('./cookieEnDc.js')

function cookie_checker(req, res, page){    
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
                if (permission == "Student"){
                    if (page == "form"){
                        fullname = recivedresults[0].username
                        examform(req, res, rollno, recivedresults);                   
                    }
                    else if (page == "result"){
                        // examform(req, res, rollno);      // examform  resul
                        res.render("html/result.hbs")
                    }
                    else{
                        res.render('html/pages-misc-error.hbs');
                    }
                }else if (permission == "Administrator"){
                    if (page == "search"){
                        const searchTerm = req.query.q;
                        const query = `SELECT * FROM user_infos WHERE sid LIKE '%${searchTerm}%'`;
                        mysql.query(query, (err, results) => {
                        if (err) {
                            console.error('Error fetching data from MySQL:', err);
                            res.json([]);
                        } else {
                            const sid = results.map((result) => result.sid);
                            const names = results.map((result) => result.username);
                            const Email = results.map((result) => result.email);
                            const permission_type = results.map((result) => result.permission_type);
                            const result = {
                                sid: sid,
                                names: names,
                                permission_type: permission_type,
                                email : Email,
                            };
                            res.json(result);
                        }
                        });
                    }
                    else if (page == "uploadfiles"){
                        res.render("html/uploadresult.hbs")
                    }
                    else if (page == "uploadnotice"){
                        res.render("html/uploadnotice.hbs")
                    }
                    else if (page == "signup"){
                        const error = req.query.error; 
                        if (error == 'emailInvalid'){ 
                            res.render('html/signup.hbs', { notvalid: true });
                        }
                        else if(error == 'alreadyuser'){
                            res.render('html/signup.hbs', { alreadyuser: true });
                        }
                        else if(error == '500error'){
                            res.render('html/signup.hbs', { servererror: true });
                        }
                        else{
                            res.render("html/signup.hbs")
                        }
                    }
                    else{
                        res.render('html/pages-misc-error.hbs');
                    }
                
                }else{
                    res.redirect('/')
                }
            }
        });
    }
}

module.exports = cookie_checker;