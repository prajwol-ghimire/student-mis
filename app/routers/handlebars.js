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

handlebars.registerHelper('incIndex', function (index) {
  return index + 1;
});