var stream = require('stream');
var await = require('await')

const db = require('../config/db.config.js');
// const results = db.results;


const excel = require('exceljs');

const readXlsxFile = require('read-excel-file/node');


const env = require('../config/env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const dbs = {};
 
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;


exports.uploadFilesem1 = (req, res) => {
    dbs.results = require('../models/1st.model.js')(sequelize, Sequelize);
    const results = dbs.results;
    try{
        let filePath = __basedir + "/uploads/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
    
            rows.shift();
            
            const semesters = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let results = {
                    sid: rows[i][0],
                    mathi: rows[i][1],
                    cprog: rows[i][2],
                    fit: rows[i][3],
                    pst: rows[i][4],
                    physics: rows[i][5],
                    ct: rows[i][6],
                    sgpa: rows[i][7]
                }
    
                semesters.push(results);
            }
    
            results.bulkCreate(semesters).then(() => {
                const results = {
                    status: "ok",
                    filename: req.file.originalname,
                    message: "Upload Successfully!",
                }

                res.json(results);
            });
        });
    }catch(error){
        const results = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(results);
    }
}


