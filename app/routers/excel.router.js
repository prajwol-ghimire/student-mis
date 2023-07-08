
let express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt")
let router = express.Router();
const mysql = require("./connection").con
let upload = require('../config/multer.config.js');
const bodyParser = require('body-parser')
const {check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({extended: false})


const firstsem = require('../controllers/firstsem.controller.js');
const secondsem = require('../controllers/secondsem.controller.js');
const thirdsem = require('../controllers/thirdsem.controller.js');


let path = __basedir + '/views/';

app.set('view engine', 'hbs');


router.get('/uploadfiles', (req,res) => {
    res.render(path + "upload.hbs")
});
router.get('/uploadnotice', (req,res) => {
    res.render(path + "noticeupload.hbs")
});

router.get('/login', (req,res) => {
    res.render(path + "index.hbs")
});

router.get('/logout', (req,res) => {
    res.clearCookie('_user_auth');
    res.clearCookie('_user_sid');
    res.redirect('/');
});


const cookies_manager = require('../routers/cookies_manager.js');

router.get('/', (req,res) => {
    cookies_manager(req, res);
});





router.get('/searchstudent', (req,res) => {
    const{roll} = req.query;
    const{semfinder} = req.query;
    if (roll == null || roll == ""){
        res.render(path + "result.hbs")
    }
    else{

        // let qry = `
        //     SELECT s1.*, s2.*, s3.*
        //     FROM semester1s s1
        //     JOIN semester2s s2 ON s1.sid = s2.sid
        //     JOIN semester3s s3 ON s1.sid = s3.sid
        //     WHERE s1.sid = ?;
        // `;

        let qry = "select * from semester1s where sid = ?";

        // let qry = `SELECT s1.*, s2.* FROM semester1s s1 JOIN semester2s s2 ON s1.sid = s2.sid WHERE s1.sid = ?;`;
        mysql.query(qry, [roll], (err, results) => {
            if (err) {
              console.error('Error executing query: ', err);
              return;
            }   else{
                if (results.length > 0) {
                    console.log(results)
                    res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})
                
                } else {
                    res.render(path + "result.hbs", { mesg2: true })
                }
            }
          
            console.log('Results:', results);
          });

        // console.log(semfinder);
        // const resultarray = [];
        // // const typedata = [];
        // for (i = 1 ; i<4 ; i++){
        //     result = "semester" + i + "s"
        //     results = resultarray[i] 
        //     let qry = "select * from "+ result +" where sid = ?";
        //     mysql.query(qry, [roll], (err, results) => {
        //         if(err) throw err
        //         else{
        //             typedata = results
        //             if (results.length > 0) {
        //                 console.log(results)
        //                 res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})
                    
        //             } else {
        //                 res.render(path + "result.hbs", { mesg2: true })
        //             }
        //         }
        //     });
        // }
        // for (i = 1 ; i<4 ; i++){
            // if (results.length > 0) {
            //     console.log(results)
            //     res.render(path + "result.hbs", { mesg1: true, data: results, checker: semfinder})  
            // } else {
            //     res.render(path + "result.hbs", { mesg2: true })
            // }
        // }
    }
});

const noticeUpload = require('../routers/noticeUpload.js');

router.post('/sendnotice', urlencodedParser,(req,res) => { 
    noticeUpload(req, res);
});


///////////////////login, signup ani otp wala part /////////////////////////

const signupValidate = require('../routers/signupvalidate.js');
const signinValidate = require('../routers/signinvalidate.js');
const otpValidate = require('../routers/otpValidate.js');

router.post('/registeruser', urlencodedParser,[
    check('txt', 'This username must me 3+ characters long').exists().isLength({ min: 3 }),
    check('email', 'Email is not valid').isEmail().normalizeEmail()
],(req,res) => { 
    signupValidate(req, res);
});

router.post('/loginuser', urlencodedParser,(req,res) => { 
    signinValidate(req, res);
});

router.post('/verifyotp', urlencodedParser,(req,res) => { 
    otpValidate(req, res);
});

router.post('/api/file/upload/sem1', upload.single("file"), firstsem.uploadFilesem1);
router.post('/api/file/upload/sem2', upload.single("file"), secondsem.uploadFilesem2);
router.post('/api/file/upload/sem3', upload.single("file"), thirdsem.uploadFilesem3);


module.exports = router;