const env = {
  database: 'student_mis',
  username: 'root',
  password: '', //use ur db pass here
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
 
module.exports = env;