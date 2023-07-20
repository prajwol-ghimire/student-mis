const mysql = require("./connection").con;

function exam_form(req, res){
  console.log(req.body)
  let name = req.body.fullname
  name = name.toUpperCase();
  let length = name.length;
  if (length < 28) {
    const neededlength = 28 - length;
    for (let i = 0; i < neededlength; i++) {
      name = name + " ";
    }
  }
  let split_name = name.split("");
  // ---------------------------------------------------
  registration = req.body.registration
  const split_registration = registration.split("");
  // ---------------------------------------------------
  sid = req.body.sid
  level = req.body.level
  year = req.body.year
  program = req.body.program
  center = req.body.center
  semester = req.body.semester
  code = req.body.code
  // ----------------------------------------------------
  qry = `SELECT * FROM subject_data where semester = `+semester+``;
  mysql.query(qry, (err, recivedresults) => {
    if (err) throw err;
    else {
      res.render("html/exam_forms.hbs", { year: year,name: split_name, rollno: split_registration, level: level,  program:program, sid:sid,center:center, subjects : recivedresults, code: code});
    }
  }); 
}


module.exports = exam_form;
