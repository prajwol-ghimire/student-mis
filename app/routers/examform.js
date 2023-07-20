const mysql = require("./connection").con;

function examform(req, res, rollno, fullname){
    let qry =   ` SELECT *
    FROM semester1s s1
    JOIN semester2s s2 ON s1.sid = s2.sid
    JOIN semester3s s3 ON s1.sid = s3.sid
    WHERE s1.sid = `+ rollno +`; `
    mysql.query(qry, (err, recivedresults) => {
        if (err) throw err;
        else{
            const subjectsWithFGrade = [];
            recivedresults.forEach((student) => {
                Object.entries(student).forEach(([subject, grade]) => {
                if (grade === 'F') {
                    subjectsWithFGrade.push({ sid: student.sid, subject, grade });
                }
                });
            });
            if (subjectsWithFGrade.length > 0){
                const arraysubjectname = [];
                const arraysubjectcode = [];
                const subjectsArray = subjectsWithFGrade.map((item) => item.subject);
                flag = 0
                subjectsArray.forEach(element => {
                    let qry = `SELECT course_name, course_code FROM subject_data where abbreviation = '`+element+`'`;
                    mysql.query(qry, (err, results) => {
                        if (err) {
                        console.log(err)
                        }
                        else{
                        const courseNames = results.map((item) => item.course_name);
                        const courseCodes = results.map((item) => item.course_code);
                        const subjectname = courseNames.join(', ');
                        const subjectcode = courseCodes.join(', ');
                        arraysubjectname.push({subjects : subjectname})
                        arraysubjectcode.push({codes : subjectcode})
                        flag ++
                        if (subjectsWithFGrade.length == flag){
                            const minLength = Math.min(arraysubjectname.length, arraysubjectcode.length);
                            const SubjectAndCode = [];
                            for (let i = 0; i < minLength; i++) {
                                SubjectAndCode.push({ ...arraysubjectname[i], ...arraysubjectcode[i] });
                            }
                            res.render("html/examform.hbs",{SubjectAndCode : SubjectAndCode, fullname: fullname, sid: rollno, permission:permission})
                        }
                        }

                    });
                    
                });

            }else{
                res.render("html/examform.hbs",{fullname: fullname, sid: rollno, permission:permission})
            }
        }
    });          
}     


module.exports = examform;