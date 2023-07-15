function exam_form(req, res){

    // semsester

    const semester = "Semester 1";


    // ---------------- NAME ------------------------------------
    const result = "Prajwol Ghimire";
    let name = result.toUpperCase();
    let length = name.length;
    if (length < 28) {
      const neededlength = 28 - length;
      for (let i = 0; i < neededlength; i++) {
        name = name + " ";
      }
    }
    let split_name = name.split("");

    // ---------------- ROLL ------------------------------------

    const rollno = "2021-1-18-0150";
    const split_rollno = rollno.split("");

    // ---------------------------------------------------------
    
    res.render("exam_form.hbs", { semester: semester,name: split_name, rollno: split_rollno });
    
    
}


module.exports = exam_form;
