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
// db.results = require('../models/results.model.js')(sequelize, Sequelize);

exports.uploadFilesem2 = (req, res) => {
    dbs.results = require('../models/2nd.model.js')(sequelize, Sequelize);
    const results = dbs.results;
    try{
        let filePath = __basedir + "/uploads/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
    
            // console.log(rows);
    
            rows.shift();
            
            const semesters = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let results = {
                    sid: rows[i][0],
                    mathii: rows[i][1],
                    lc: rows[i][2],
                    oop: rows[i][3],
                    wt: rows[i][4],
                    drawing: rows[i][5],
                    mfcs: rows[i][6],
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

