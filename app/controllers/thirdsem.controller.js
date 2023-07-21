const readXlsxFile = require('read-excel-file/node');
const Sequelize = require('sequelize');
sequelize = require('../config/sequelize_adapter.js');

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;


exports.uploadFilesem3 = (req, res) => {
    dbs.results = require('../models/3rd.model.js')(sequelize, Sequelize);
    const results = dbs.results;
    try{
        year = req.body.year
        let filePath = __basedir + "/uploads/results/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
             
            rows.shift();
            
            const semesters = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
                let results = {
                    sid: rows[i][0],
                    MTH_212: rows[i][1],
                    CMP_220: rows[i][2],
                    CMP_225: rows[i][3],
                    MTH_221: rows[i][4],
                    CMP_212: rows[i][5],
                    CMP_214: rows[i][6],
                    sgpa: rows[i][7],
                    year:year
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
       
    }
}


