const handlebars = require('hbs');
const mysql = require("./connection").con;

handlebars.registerHelper('compareString', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('isBlank', function (value, options) {
  if (value === null || value === undefined) {
    return options.fn(this);
  }
  return value.trim().length === 0 ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('changeString', function (marks) {
  if (typeof marks === 'string' && marks.endsWith('+')) {  
    return (marks.slice(0, -1) + 'plus');
  }else if(typeof marks === 'string' && marks.endsWith('-')){
      return (marks.slice(0, -1) + 'minus');
  }else{
    return marks;
  }
});

handlebars.registerHelper('jsonStringify', function (obj) {
  return new handlebars.SafeString(JSON.stringify(obj));
});

handlebars.registerHelper('subjectname', function (abbreviation) {
  let qry = `SELECT course_name FROM subject_data where abbreviation = '`+abbreviation+`'`;
  mysql.query(qry, (err, results) => {
    if (err) {
      console.log(err)
    }
    else{
      const courseNames = results.map((item) => item.course_name);
      const resultString = courseNames.join(', ');
      console.log(resultString)
      return resultString
    }
  });
  
});

// handlebars.registerHelper('subjectcode', function (abbreviation) {
//   let qry = `SELECT course_code FROM subject_data where abbreviation = `+abbreviation+``;
//   mysql.query(qry, (err, results) => {
//     if (err) {
//     }
//     else{
//       console.log(results)
//       return subject
//     }
//   });
  
// });