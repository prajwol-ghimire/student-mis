const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test11'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM user_infos";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'Manage User',
            user_infos : rows
        });
    });
});


app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'Add Users'
    });
});

app.post('/save',(req, res) => { 
    let data = {sid: req.body.sid, username: req.body.username, email: req.body.email, permission_type: req.body.permission_type};
    let sql = "INSERT INTO user_infos SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/edit/:sid',(req, res) => {
    const sid = req.params.sid;
    let sql = `Select * from user_infos where sid = ${sid}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'Edit User ',
            user : result[0]
        });
    });
});


app.get('/search/:sid',(req, res) => {
    const sid = req.params.sid;
    let sql = `Select * from user_infos where sid = ${sid}`;
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'Manage User',
            user_infos : rows
        });
    });
});


// app.post('/update/:sid',(req, res) => {
//     const sid = req.body.sid;
//     let sql = "update user_infos SET sid='"+req.body.sid+"', username='"+req.body.username+"',  email='"+req.body.email+"',  permission_type='"+req.body.permission_type+"' where sid ="+sid;
//     let query = connection.query(sql,(err, results) => {
//       if(err) throw err;
//       res.redirect('/');
//     });
// });


app.post('/update/:sid', (req, res) => {
    const sid = req.body.sid;
    const { username, email, permission_type } = req.body;
    let sql = `UPDATE user_infos SET
                username = '${username}',
                email = '${email}',
                permission_type = '${permission_type}'
                WHERE sid = ${sid}`;
  
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
  });


app.get('/delete/:sid',(req, res) => {
    const sid = req.params.sid;
    let sql = `DELETE from user_infos where sid = ${sid}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});