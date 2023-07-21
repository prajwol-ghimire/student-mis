const { check, validationResult } = require('express-validator');
const mysql = require("./connection").con;
const cookies = require('./cookieEnDc.js')

// Get the results for a specific student ID (SID)
function getResults(sid,permission,fullname,user_image, res) {
    let qry1 = `SELECT * FROM semester1s WHERE sid = '` + sid + `'`;
    mysql.query(qry1, (err, results1) => {
        if (err) {
            console.log(err);
            res.render("html/login.hbs");
        } else {
            if (results1.length > 0) {
                let qry2 = `SELECT * FROM semester2s WHERE sid = '` + sid + `'`;
                mysql.query(qry2, (err, results2) => {
                    if (err) {
                        console.log(err);
                        res.render("html/login.hbs");
                    } else {
                        if (results2.length > 0) {
                            let qry3 = `SELECT * FROM semester3s WHERE sid = '` + sid + `'`;
                            mysql.query(qry3, (err, results3) => {
                                if (err) {
                                    console.log(err);
                                    res.render("html/login.hbs");
                                } else {
                                    if (results3.length > 0) {
                                        res.render('html/result.hbs', {
                                            sem1: true,
                                            sem1result: results1,
                                            sem2: true,
                                            sem2result: results2,
                                            sem3: true,
                                            sem3result: results3
                                            ,permission:permission, username: fullname, photo:user_image
                                        });
                                    } else {
                                        res.render('html/result.hbs', {
                                            sem1: true,
                                            sem1result: results1,
                                            sem2: true,
                                            sem2result: results2
                                            ,permission:permission, username: fullname, photo:user_image
                                        });
                                    }
                                }
                            });
                        } else {
                            // console.log(results1)                
                            res.render('html/result.hbs', {
                                sem1: true,
                                sem1result: results1
                                ,permission:permission, username: fullname, photo:user_image
                            });
                        }
                    }
                });
            } else {
                res.render('html/result.hbs');
            }
        }
    });
}

/**
 * Renders the result page with the student's results
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function showresults(req, res) {
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
                    getResults(nonhashedroll,permission,fullname,user_image, res);
                }else{
                    res.redirect("/")
                }
            }
        });
    
      
    } else {
        res.render("html/login.hbs");
    }
}

module.exports = showresults;
