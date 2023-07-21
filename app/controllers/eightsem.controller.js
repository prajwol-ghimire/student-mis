const readXlsxFile = require('read-excel-file/node');
const Sequelize = require('sequelize');
sequelize = require('../config/sequelize_adapter.js');

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;


exports.uploadFilesem8 = (req, res) => {
    dbs.results = require('../models/8th.model.js')(sequelize, Sequelize);
    const results = dbs.results;
    try{
        year = req.body.year 
        let filePath = __basedir + "/uploads/results/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
    
            rows.shift();
            
            const semesters = [];
    
            let length = rows.length;
    
            for(let i=0; i<=length; i++){
    
                let results = {
                    sid: rows[i][0],
                    CMP_436: rows[i][1],
                    CMP_420: rows[i][2],
                    Elective_II: rows[i][3],
                    CMP_490: rows[i][4],
                    sgpa: rows[i][7],
                    year : year
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


