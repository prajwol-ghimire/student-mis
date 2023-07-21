const readXlsxFile = require('read-excel-file/node');
const Sequelize = require('sequelize');
sequelize = require('../config/sequelize_adapter.js');

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;


exports.uploadFilesem7 = (req, res) => {
    dbs.results = require('../models/7th.model.js')(sequelize, Sequelize);
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
                    CMP_430: rows[i][1],
                    CMP_435: rows[i][2],
                    CMP_480: rows[i][3],
                    CMP_441: rows[i][4],
                    CMP_421: rows[i][5],
                    Elective_I: rows[i][6],
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
        res.json(results);
    }
}


