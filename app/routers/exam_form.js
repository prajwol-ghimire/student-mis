const mysql = require("./connection").con;

function exam_form(req, res){
  let name = req.body.fullname
  name = name.toUpperCase();
  let namelength = name.length;
  if (namelength < 28) {
    const neededlengthname = 28 - namelength;
    for (let i = 0; i < neededlengthname; i++) {
      name = name + " ";
    }
  }
  let split_name = name.split("");
  // ---------------------------------------------------
  registration = req.body.registration
  reglength = registration.length
  if (reglength < 18) {
    const neededlengthreg = 18 - reglength;
    for (let i = 0; i < neededlengthreg; i++) {
      registration = registration + " ";
    }
  }
  const split_registration = registration.split("");
  // ---------------------------------------------------
  sid = req.body.sid
  level = req.body.level
  year = req.body.year
  program = req.body.program
  center = req.body.center
  semester = req.body.semester
  if (req.file){
    photo = req.file.filename
  }else{
    photo = "pp-photo.png"
  }
  // ----------------------------------------------------

  re_exam = req.body.subjects
  resubjects = []
  if(re_exam){
    if (!Array.isArray(re_exam)) {
      re_exam = [re_exam]
    } 
    for(i=0; i<re_exam.length; i++){
      const retake = re_exam[i].split('--');
      const courseCode = retake[0];
      const courseName = retake[1];
      const courseCredits = retake[2];
      resubjects.push({ courseCode: courseCode,courseName: courseName,courseCredits: courseCredits});
    }
  }
   // ---------------------------------------------------
  qry = `SELECT * FROM subject_data where semester = `+semester+``;
  mysql.query(qry, (err, recivedresults) => {
    if (err) throw err;
    else {
      // for extra table box
      if(recivedresults){
        resultlength = recivedresults.length
        if (resultlength<13){
          const neededlengthres = 13 - resultlength
          for(i= 0; i<neededlengthres; i++){
              recivedresults.push({
                id: null,
            })
          }
        }
      }
      resublength = resubjects.length
      if (resublength<6){
        const neededlengthrep = 6 - resublength
        for(i= 0; i<neededlengthrep; i++){
            resubjects.push({
              id: null,
          })
        }
      }
      // extra box end
        res.render("html/exam_forms.hbs", { year: year,name: split_name, rollno: split_registration, level: level,  program:program, sid:sid,center:center, subjects : recivedresults, resubjects : resubjects, photo : photo});
    }
  }); 
}


module.exports = exam_form;
