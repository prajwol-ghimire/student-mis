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
        const rollno = cookies.decrypt(hrollno,res,req);
        let qry = "select * from user_infos join user_data on user_infos.sid=user_data.sid where user_infos.sid = '"+ rollno +"' ";   
        mysql.query(qry, (err, recivedresults) => {
            if (err) throw err;
            else { 
                if(recivedresults.length > 0){
                    permission = recivedresults[0].permission_type
                    if (permission == "Student"){
                        if (page == "form"){
                            examform(req, res, rollno, recivedresults);                   
                        }
                        else if (page == "result"){
                            fullname = recivedresults[0].username                            
                            user_image=recivedresults[0].user_image
                            res.render("html/result.hbs",{permission:permission, username: fullname, photo:user_image})
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
                            fullname = recivedresults[0].username                            
                            user_image=recivedresults[0].user_image
                            res.render("html/uploadresult.hbs",{permission:permission, username: fullname, photo:user_image})
                        }  
                        else if (page == "viewsusers"){
                            fullname = recivedresults[0].username                            
                            user_image=recivedresults[0].user_image
                            let sql = "SELECT * FROM user_infos";
                            let query = mysql.query(sql, (err, rows) => {
                                if (err) throw err;
                                errorParam = req.query.error
                                const referrer = req.headers.referer || req.headers.referrer;
                                if (referrer && referrer.includes('http://localhost:8080/viewsusers')) {
                                    if( errorParam == "master" ){
                                        res.render('html/viewsusers.hbs', {
                                            title: 'Manage User',
                                            user_infos: rows,
                                            permission:permission, 
                                            username: fullname, 
                                            photo:user_image,
                                            master: true
                                        });
                                    }else{
                                        res.render('html/viewsusers.hbs', {
                                            title: 'Manage User',
                                            user_infos: rows,
                                            permission:permission, 
                                            username: fullname, 
                                            photo:user_image,
                                            master: false
                                        });
                                    }
                                  } else {
                                    res.render('html/viewsusers.hbs', {
                                        title: 'Manage User',
                                        user_infos: rows,
                                        permission:permission, 
                                        username: fullname, 
                                        photo:user_image,
                                        master: false
                                    });
                                  }
                            });
                        }
                        else if (page == "uploadnotice"){
                            fullname = recivedresults[0].username                            
                            user_image=recivedresults[0].user_image
                            res.render("html/uploadnotice.hbs", { permission:permission, username: fullname, photo:user_image})
                        }
                        else if (page == "signup"){
                            fullname = recivedresults[0].username                            
                            user_image=recivedresults[0].user_image
                            const error = req.query.error; 
                            if (error == 'emailInvalid'){  
                                res.render('html/signup.hbs', { notvalid: true , permission:permission, username: fullname, photo:user_image});
                            }
                            else if(error == 'alreadyuser'){
                                res.render('html/signup.hbs', { alreadyuser: true, permission:permission, username: fullname, photo:user_image });
                            }
                            else if(error == '500error'){
                                res.render('html/signup.hbs', { servererror: true, permission:permission, username: fullname, photo:user_image });
                            }
                            else{
                                res.render("html/signup.hbs", {permission:permission, username: fullname, photo:user_image})
                            }
                        }
                        else if(page == "edit"){
                            fullname = recivedresults[0].username                            
                            user_image=recivedresults[0].user_image
                            const sid = req.body.sid;
                            let sql = `Select * from user_infos where sid = ${sid}`;
                            let query = mysql.query(sql, (err, result) => {
                                if (err) throw err;
                                res.render('html/user_edit.hbs', { title: 'Edit User ', user: result[0] , permission:permission, username: fullname, photo:user_image});
                            });
                        }
                        else{
                            res.render('html/pages-misc-error.hbs');
                        }
                    
                    }else{
                        res.redirect('/')
                    }
                }
                else{
                    res.redirect('/')
                }
            }
        });
    }
}

module.exports = cookie_checker;