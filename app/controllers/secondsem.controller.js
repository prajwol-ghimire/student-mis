const readXlsxFile = require('read-excel-file/node');
const Sequelize = require('sequelize');
sequelize = require('../config/sequelize_adapter.js');

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;

exports.uploadFilesem2 = (req, res) => {
    dbs.results = require('../models/2nd.model.js')(sequelize, Sequelize);
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
                    MTH_114: rows[i][1],
                    ELX_212: rows[i][2],
                    CMP_115: rows[i][3],
                    CMP_213: rows[i][4],
                    MTH_120: rows[i][5],
                    MTH_130: rows[i][6],
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

