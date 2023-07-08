const express = require('express');
const app = express();
 
const db = require('./app/config/db.config.js');

global.__basedir = __dirname;   
    
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
});       

let router = require('./app/routers/excel.router.js');
app.use(express.static('resources'));
app.use('/', router);   
// app.use('/', signup);  

const server = app.listen(8080, function () {
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening ats http://%s:%s", host, port); 
})