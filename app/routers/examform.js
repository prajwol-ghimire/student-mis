const mysql = require("./connection").con;

function examform(req, res, rollno, recived){
    fullname = recived[0].username                            
    user_image=recived[0].user_image
    permission = recived[0].permission_type;
    const subjectsWithFGrade = [];
    const pushedSub = [];
    loop = 0
    let qry = `SELECT * FROM user_data where sid = `+rollno+``;
    mysql.query(qry, (err, recivedresults) => {
        if (err) throw err;
        else{
            registration = recivedresults[0].registration
            faculty = recivedresults[0].faculty
            semester = recivedresults[0].semester
                for(sem = 1; sem<9; sem++){  
                    let qry = `SELECT * FROM semester`+sem+`s where sid = `+rollno+``;
                    mysql.query(qry, (err, recivedresults) => {
                        if (err) throw err;
                        else{
                            recivedresults.forEach((student) => {
                                Object.entries(student).forEach(([subject, grade]) => {
                                if (grade === 'F'|| grade ==='CNR') {
                                    const exists = pushedSub.includes(subject);
                                    if (!exists) {
                                        pushedSub.push(subject)
                                        subjectsWithFGrade.push({ sid: student.sid, subject, grade });
                                    } 
                                }else if (grade !== null){
                                    const exists = pushedSub.includes(subject);
                                    if (exists){
                                        for (let i = 0; i < subjectsWithFGrade.length; i++) {
                                            if (subjectsWithFGrade[i].subject === subject) {
                                                subjectsWithFGrade.splice(i, 1);
                                            }
                                        }
                                    }
                                }
                                });
                            });
                            loop ++
                            if (loop==8){
                                if (subjectsWithFGrade.length > 0){
                                    Totalback = subjectsWithFGrade.length
                                    const arraysubjectname = [];
                                    const arraysubjectcode = [];
                                    const arraysubjectcredit = [];
                                    const subjectsArray = subjectsWithFGrade.map((item) => item.subject);
                                    flag = 0
                                    subjectsArray.forEach(element => {
                                        let qry = `SELECT course_name, course_code, credit FROM subject_data where abbreviation = '`+element+`'`;
                                        mysql.query(qry, (err, results) => {
                                            if (err) {
                                            console.log(err)
                                            }
                                            else{
                                            const courseNames = results.map((item) => item.course_name);
                                            const courseCodes = results.map((item) => item.course_code);
                                            const courseCredit = results.map((item) => item.credit);
                                            const subjectname = courseNames.join(', ');
                                            const subjectcode = courseCodes.join(', ');
                                            const courseCredits = courseCredit.join(', ');
                                            arraysubjectname.push({subjects : subjectname})
                                            arraysubjectcode.push({codes : subjectcode})
                                            arraysubjectcredit.push({credit : courseCredits})
                                            flag ++
                                            if (subjectsWithFGrade.length == flag){
                                                const minLength = Math.min(arraysubjectname.length, arraysubjectcode.length);
                                                const SubjectAndCode = [];
                                                for (let i = 0; i < minLength; i++) {
                                                    SubjectAndCode.push({ ...arraysubjectname[i], ...arraysubjectcode[i], ...arraysubjectcredit[i]});
                                                }
                                                res.render("html/examform.hbs",{SubjectAndCode : SubjectAndCode, fullname: fullname, sid: rollno, permission:permission, photo:user_image, Totalback : Totalback, registration:registration, faculty:faculty, semester:semester})
                                            }
                                            }
                            
                                        });
                                        
                                    });
                            
                                }else{
                                    res.render("html/examform.hbs",{fullname: fullname, sid: rollno, permission:permission, photo:user_image})
                                }
                            }
                        }
                    }); 
                }    
            }
    });
}     


module.exports = examform;