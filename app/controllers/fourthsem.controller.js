const readXlsxFile = require('read-excel-file/node');
const Sequelize = require('sequelize');
sequelize = require('../config/sequelize_adapter.js');

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;


exports.uploadFilesem1 = (req, res) => {
    dbs.results = require('../models/4th.model.js')(sequelize, Sequelize);
    const results = dbs.results;
    try{
        let filePath = __basedir + "/uploads/results/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
    
            rows.shift();
            
            const semesters = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let results = {
                    sid: rows[i][0],
                    CMP_334: rows[i][1],
                    CMP_226: rows[i][2],
                    CMP_241: rows[i][3],
                    CMP_321: rows[i][4],
                    MTH_230: rows[i][5],
                    CMP_290: rows[i][6],
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


