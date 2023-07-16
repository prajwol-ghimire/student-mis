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

//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------- Routing on both Student and Admin ------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ GET REQUEST(BOTH) -------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------


const cookies_manager = require('./cookies_manager.js');
const showNotice = require('./showNotice.js');
const verify_token = require('./verify_token.js');
const account_settings = require('./account_settings.js');
// const cookie_checker = require('./cookie_checker.js');

router.get('/', (req, res) => {
  cookies_manager(req, res);
});

router.get('/notice', (req,res) => {
  showNotice(req,res)
});

router.get('/reset-password', urlencodedParser, (req, res) => {
  verify_token(req, res);
});

router.get('/password_reset', (req, res) => {
  const sucess = req.query.sucess; 
  if (sucess == 'hasbeensent'){ 
    res.render('password_reset.hbs', { hasbeensent: true });
  }else{
    res.render(path + "password_reset.hbs")
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('_user_auth');
  res.clearCookie('_user_sid');
  res.redirect('/');
});

router.get('/login', (req, res) => {
  const error = req.query.error; 
  if (error == 'nosuchuser'){ 
    res.render(path + 'login.hbs', {nosuchuser : true})  
  }else{
    res.render(path + "login.hbs")
  }
});

router.get('/profile-setting', (req,res) => {
  account_settings(req,res);
});


//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ POST REQUEST(BOTH) ------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------

const signupValidate = require('./signupvalidate.js');
const signinValidate = require('./signinvalidate.js');
const otpValidate = require('./otpValidate.js');
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

router.post('/reset_password', urlencodedParser, (req, res) => {
  reset_password(req, res);
});

router.post('/changed_password', urlencodedParser,(req,res) => { 
    change_password(req, res)
});



//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ Routing for student -----------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------


const showresults = require('./showresults.js');

router.get('/form', (req,res) => {
  res.render(newPath+"/html/exam_form.hbs")
});

router.get('/result', (req,res) => {
  res.render(newPath+"/html/result.hbs")
});

router.get('/showresult', urlencodedParser, (req, res) => {
  showresults(req, res)
});

router.get('/fee-structure', (req, res) => {
  res.render(path + "fee-structure.hbs")
});

const exam_form = require('./exam_form.js');

router.get('/exam-form', (req, res) => {
  exam_form(req, res);
});


//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ Routing for Admin -------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ GET REQUEST(ADMIN) ------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------


router.get('/search', (req, res) => {
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
});

router.get('/uploadfiles', (req, res) => {
  res.render(path + "/admin/html/uploadresult.hbs")
});

router.get('/uploadnotice', (req, res) => {
  res.render(path + "admin/html/uploadnotice.hbs")
});

router.get('/signup', (req, res) => {
  const error = req.query.error; 
  if (error == 'emailInvalid'){ 
    res.render(path  + '/admin/html/signup.hbs', { notvalid: true });
  }
  else if(error == 'alreadyuser'){
    res.render(path + '/admin/html/signup.hbs', { alreadyuser: true });
  }
  else if(error == '500error'){
    res.render(path + '/admin/html/signup.hbs', { servererror: true });
  }
  else{
    res.render(path+ "/admin/html/signup.hbs")
  }
});

router.get('/viewsusers', (req, res) => {
  let sql = "SELECT * FROM user_infos";
  let query = mysql.query(sql, (err, rows) => {
    if (err) throw err;
    res.render(path + '/admin/html/viewsusers.hbs', {
      title: 'Manage User',
      user_infos: rows
    });
  });
});



//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ POST REQUEST(ADMIN) -----------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------



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
    res.render(path + '/admin/html/user_edit.hbs', { title: 'Edit User ', user: result[0] });
  });
});


//--------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ UPLOAD SECTION(POST) ----------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------



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

// Router for notice photo upload
const notice_Upload = require('./notice_Upload.js');
let Noticeupload = require('../config/multer.notice.config.js');


router.post('/sendnotice', urlencodedParser, Noticeupload.single("notice"), (req,res) => {
  notice_Upload(req, res);
});


// 404 error display

router.post('*', (req,res) => {
  res.render(path + '/student/html/pages-misc-error.hbs');
});

router.get('*', (req,res) => {
  res.render(path + '/student/html/pages-misc-error.hbs');
});



module.exports = router;