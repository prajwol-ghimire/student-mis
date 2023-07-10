const {check, validationResult } = require('express-validator')
const mysql = require("./connection").con
const cookieParser = require("cookie-parser");
const { await } = require('await')


function getResults(sid,res) {

    let qry = `
        SELECT s1.*, s2.*, s3.*
        FROM semester1s s1
        JOIN semester2s s2 ON s1.sid = s2.sid
        JOIN semester3s s3 ON s1.sid = s3.sid
        WHERE s1.sid = ?;
    `;
    console.log(sid)
    mysql.query(qry, sid, (err, results) => {
        if (err) {
            res.render("login.hbs"); 
        }   
        else{
            // if (results.length > 0) {
            //     console.log(results)
            //     res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})
            
            // } else {
            //     res.render(path + "result.hbs", { mesg2: true })
            // }

            console.log(results)

        }
    });
}


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
        let n_sid =decodeURIComponent(rollno)
        let qry = "select sid from user_cookies where sid_cookie = ?";
        mysql.query(qry, n_sid, (err, recivedresults) => {   
            if(err) throw err
            else{  
                if (recivedresults.length > 0) {
                    const nonhashedroll = recivedresults[0].sid;
                    getResults(nonhashedroll,res);       
                }else {  
                    res.render("login.hbs"); 
                }

            }
        });
    } else {
        res.render("login.hbs"); 
    }



    // const{roll} = req.query;
    // const{semfinder} = req.query;
    // if (roll == null || roll == ""){
    //     res.render(path + "result.hbs")
    // }
    // else{

    //     // let qry = `
    //     //     SELECT s1.*, s2.*, s3.*
    //     //     FROM semester1s s1
    //     //     JOIN semester2s s2 ON s1.sid = s2.sid
    //     //     JOIN semester3s s3 ON s1.sid = s3.sid
    //     //     WHERE s1.sid = ?;
    //     // `;

    //     let qry = "select * from semester1s where sid = ?";

    //     // let qry = `SELECT s1.*, s2.* FROM semester1s s1 JOIN semester2s s2 ON s1.sid = s2.sid WHERE s1.sid = ?;`;
    //     mysql.query(qry, [roll], (err, results) => {
    //         if (err) {
    //           console.error('Error executing query: ', err);
    //           return;
    //         }   else{
    //             if (results.length > 0) {
    //                 console.log(results)
    //                 res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})
                
    //             } else {
    //                 res.render(path + "result.hbs", { mesg2: true })
    //             }
    //         }
          
    //         console.log('Results:', results);
    //       });

    //     // console.log(semfinder);
    //     // const resultarray = [];
    //     // // const typedata = [];
    //     // for (i = 1 ; i<4 ; i++){
    //     //     result = "semester" + i + "s"
    //     //     results = resultarray[i] 
    //     //     let qry = "select * from "+ result +" where sid = ?";
    //     //     mysql.query(qry, [roll], (err, results) => {
    //     //         if(err) throw err
    //     //         else{
    //     //             typedata = results
    //     //             if (results.length > 0) {
    //     //                 console.log(results)
    //     //                 res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})
                    
    //     //             } else {
    //     //                 res.render(path + "result.hbs", { mesg2: true })
    //     //             }
    //     //         }
    //     //     });
    //     // }
    //     // for (i = 1 ; i<4 ; i++){
    //         // if (results.length > 0) {
    //         //     console.log(results)
    //         //     res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})  
    //         // } else {
    //         //     res.render(path + "result.hbs", { mesg2: true })
    //         // }
    //     // }
    // }
}


module.exports = showresults;