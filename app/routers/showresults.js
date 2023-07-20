const { check, validationResult } = require('express-validator');
const mysql = require("./connection").con;
const cookieParser = require("cookie-parser");
const { await } = require('await');
const { Result } = require('../config/db.config');

// Get the results for a specific student ID (SID)
function getResults(sid, res) {
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
                                        res.render('result.hbs', {
                                            sem1: true,
                                            sem1result: results1,
                                            sem2: true,
                                            sem2result: results2,
                                            sem3: true,
                                            sem3result: results3
                                        });
                                    } else {
                                        res.render('result.hbs', {
                                            sem1: true,
                                            sem1result: results1,
                                            sem2: true,
                                            sem2result: results2
                                        });
                                    }
                                }
                            });
                        } else {
                            res.render('result.hbs', {
                                sem1: true,
                                sem1result: results1
                            });
                        }
                    }
                });
            } else {
                res.render('result.hbs');
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
        const nonhashedroll = cookies.decrypt(hrollno);
        getResults(nonhashedroll, res);
    } else {
        res.render("html/login.hbs");
    }
}

module.exports = showresults;
