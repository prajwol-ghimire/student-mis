const express = require('express');
const app = express();
const mysql = require("./connection").con;
const cookieParser = require("cookie-parser");
app.use(cookieParser());

async function cookie_checker(req, res, page){
    
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
                            if (permission == "Student"){
                                if (page == "form"){
                                    let qry =   ` SELECT *
                                    FROM semester1s s1
                                    JOIN semester2s s2 ON s1.sid = s2.sid
                                    JOIN semester3s s3 ON s1.sid = s3.sid
                                    WHERE s1.sid = `+rollno+`; `
                                    mysql.query(qry, (err, recivedresults) => {
                                        if (err) throw err;
                                        else{
                                            const subjectsWithFGrade = [];
                                            recivedresults.forEach((student) => {
                                              Object.entries(student).forEach(([subject, grade]) => {
                                                if (grade === 'F') {
                                                  subjectsWithFGrade.push({ sid: student.sid, subject, grade });
                                                }
                                              });
                                            });
                                            if (subjectsWithFGrade.length > 0){
                                                const arraysubjectname = [];
                                                const subjectsArray = subjectsWithFGrade.map((item) => item.subject);
                                                console.log(subjectsArray)
                                                subjectsArray.forEach(element => {
                                                    let qry = `SELECT course_name FROM subject_data where abbreviation = '`+element+`'`;
                                                    mysql.query(qry, (err, results) => {
                                                      if (err) {
                                                        console.log(err)
                                                      }
                                                      else{
                                                        const courseNames = results.map((item) => item.course_name);
                                                        const subjectname = courseNames.join(', ');
                                                        console.log(subjectname)
                                                        arraysubjectname.push({subjects : subjectname})
                                                        // res.redirect("html/examform.hbs",{subjectname : arraysubjectname})
                                                      }

                                                    });
                                                    
                                                });
                                                console.log(arraysubjectname)

                                            }else{
                                                res.render("html/examform.hbs")
                                            }
                                        }
                                    });
                                   

                                  
                                }
                                else if (page == "result"){
                                    res.render("html/result.hbs")
                                }
                                else{
                                    res.render('html/pages-misc-error.hbs');
                                }
                            }else if (permission == "Administrator"){
                                if (page == "search"){
                                    const searchTerm = req.query.q;
                                    console.log(searchTerm)
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
                } else {
                    res.redirect('/')
                }
            }
        });
    } else {
        res.redirect('/')
    }
}

module.exports = cookie_checker;