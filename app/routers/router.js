const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
let router = express.Router();
const mysql = require("./connection").con
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
require("../routers/handlebars.js")


const firstsem = require('../controllers/firstsem.controller.js');
const secondsem = require('../controllers/secondsem.controller.js');
const thirdsem = require('../controllers/thirdsem.controller.js');

let path = __basedir + '/views/';
router.use(express.static(path));
app.set('view engine', 'hbs');


let newPath= __basedir+'/views/student'
router.use(express.static(newPath));

//Routing for student
const account_settings = require('./account_settings.js');

router.get('/profile-setting', (req,res) => {
  account_settings(req,res);
    // res.render(newPath+"/html/account_setting.hbs")
});
router.get('/form', (req,res) => {
    res.render(newPath+"/html/exam_form.hbs")
});
router.get('/notice', (req,res) => {
    res.render(newPath+"/html/notice.hbs")
});
router.get('/result', (req,res) => {
    res.render(newPath+"/html/result.hbs")
});

// user data ma ni janu paryo

const cookies_manager = require('./cookies_manager.js');
const showresults = require('./showresults.js');
const verify_token = require('./verify_token.js');

// Routes for homepage, show results, reset password, and logout
router.get('/', (req, res) => {
  cookies_manager(req, res);
});

router.get('/showresult', urlencodedParser, (req, res) => {
  showresults(req, res)
});

router.get('/reset-password', urlencodedParser, (req, res) => {
  verify_token(req, res);
});

router.get('/logout', (req, res) => {
  res.clearCookie('_user_auth');
  res.clearCookie('_user_sid');
  res.redirect('/');
});

// Routes for other pages (password reset, file upload, fee structure, login, signup, about us, changed password, and user views)
router.get('/password_reset', (req, res) => {
  const sucess = req.query.sucess; 
  if (sucess == 'hasbeensent'){ 
    res.render('password_reset.hbs', { hasbeensent: true });
  }else{
    res.render(path + "password_reset.hbs")
  }
});

router.get('/uploadfiles', (req, res) => {
  res.render(path + "upload.hbs")
});

router.get('/uploadnotice', (req, res) => {
  res.render(path + "noticeupload.hbs")
});

router.get('/fee-structure', (req, res) => {
  res.render(path + "fee-structure.hbs")
});

router.get('/login', (req, res) => {
  const error = req.query.error; 
  if (error == 'nosuchuser'){ 
    res.render(path + 'login.hbs', {nosuchuser : true})  
  }else{
    res.render(path + "login.hbs")
  }
});

router.get('/signup', (req, res) => {
  res.render(path + "signup.hbs")
});

router.get('/aboutus', (req, res) => {
  res.render(path + "signup.hbs")
});




// --------------------------------------------------------------

const exam_form = require('./exam_form.js');

router.get('/exam-form', (req, res) => {
  exam_form(req, res);
});


// --------------------------------------------------------------

router.get('/viewsusers', (req, res) => {
  let sql = "SELECT * FROM user_infos";
  let query = mysql.query(sql, (err, rows) => {
    if (err) throw err;
    res.render(path + 'viewsusers.hbs', {
      title: 'Manage User',
      user_infos: rows
    });
  });
});

// Routes for user registration, login, OTP verification, notice upload, password reset, and user management
const signupValidate = require('./signupvalidate.js');
const signinValidate = require('./signinvalidate.js');
const otpValidate = require('./otpValidate.js');
const noticeUpload = require('./noticeUpload.js');
const reset_password = require('./reset_password.js');
const change_password = require('./change_password.js');


router.post('/registeruser', urlencodedParser, (req, res) => {
  signupValidate(req, res);
});

router.post('/loginuser', urlencodedParser, (req, res) => {
  signinValidate(req, res);
});

router.post('/verifyotp', urlencodedParser, (req, res) => {
  otpValidate(req, res);
});

router.post('/sendnotice', urlencodedParser, (req, res) => {
  noticeUpload(req, res);
});

router.post('/reset_password', urlencodedParser, (req, res) => {
  reset_password(req, res);
});

router.post('/changed_password', urlencodedParser,(req,res) => { 
    change_password(req, res)
});

router.post('/update', urlencodedParser, (req, res) => {
  const sid = req.body.sid;
  const { username, email, permission_type } = req.body;
  let sql = `UPDATE user_infos SET
              username = '${username}',
              email = '${email}',
              permission_type = '${permission_type}'
              WHERE sid = ${sid}`;

  let query = mysql.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/viewsusers');
  });
});

router.post('/delete', urlencodedParser, (req, res) => {
  const sid = req.body.sid;
  let sql = `DELETE from user_infos where sid = ${sid}`;
  let query = mysql.query(sql, (err, result) => {
    if (err) throw err;
    let sql = `DELETE from user_data where sid = ${sid}`;
    let query = mysql.query(sql, (err, result) => {
      if (err) throw err;
      let sql = `DELETE from user_cookies where sid = ${sid}`;
      let query = mysql.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/viewsusers');
      });
    });
  });
});

router.post('/edit', urlencodedParser, (req, res) => {
  const sid = req.body.sid;
  let sql = `Select * from user_infos where sid = ${sid}`;
  let query = mysql.query(sql, (err, result) => {
    if (err) throw err;
    res.render(path + 'user_edit.hbs', { title: 'Edit User ', user: result[0] });
  });
});

// Routes for file upload in different semesters
let Resultupload = require('../config/multer.result.config.js');

router.post('/api/file/upload/sem1', Resultupload.single("file"), firstsem.uploadFilesem1);
router.post('/api/file/upload/sem2', Resultupload.single("file"), secondsem.uploadFilesem2);
router.post('/api/file/upload/sem3', Resultupload.single("file"), thirdsem.uploadFilesem3);

// Router for profile photo upload
const updateAccount = require('./updateAccount.js');
let Profileupload = require('../config/multer.profile.config.js');

router.post('/updateAccount', urlencodedParser, Profileupload.single('photo'), (req,res) => {
  updateAccount(req, res);
});

module.exports = router;