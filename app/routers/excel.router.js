const { check, validationResult } = require('express-validator');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
  secret: 'KEYSSPECIAL',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
const bcrypt = require("bcrypt")
let router = express.Router();
const mysql = require("./connection").con
let upload = require('../config/multer.config.js');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const handlebars = require('hbs');

handlebars.registerHelper('compareString', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('isBlank', function (value, options) {
  if (value === null || value === undefined) {
    return options.fn(this);
  }
  return value.trim().length === 0 ? options.fn(this) : options.inverse(this);
});

const firstsem = require('../controllers/firstsem.controller.js');
const secondsem = require('../controllers/secondsem.controller.js');
const thirdsem = require('../controllers/thirdsem.controller.js');

let path = __basedir + '/views/';
router.use(express.static(path));
app.set('view engine', 'hbs');

const cookies_manager = require('../routers/cookies_manager.js');
const showresults = require('../routers/showresults.js');
const verify_token = require('../routers/verify_token.js');

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
const signupValidate = require('../routers/signupvalidate.js');
const signinValidate = require('../routers/signinvalidate.js');
const otpValidate = require('../routers/otpValidate.js');
const noticeUpload = require('../routers/noticeUpload.js');
const reset_password = require('../routers/reset_password.js');
const change_password = require('../routers/change_password.js');

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
    res.redirect('/viewsusers');
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
router.post('/api/file/upload/sem1', upload.single("file"), firstsem.uploadFilesem1);
router.post('/api/file/upload/sem2', upload.single("file"), secondsem.uploadFilesem2);
router.post('/api/file/upload/sem3', upload.single("file"), thirdsem.uploadFilesem3);

module.exports = router;