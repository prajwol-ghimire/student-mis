const mysql = require("./connection").con

function CheckPasswordRequest() {
    const query = `SELECT reset_token_time from user_cookies`;
    mysql.query(query,(err, results) => {
        if(err) throw err
        else{  
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    const resetTokenTime = results[i].reset_token_time;
                    currentServerDate = Date.now()
                    if (resetTokenTime < currentServerDate){
                        const query = `UPDATE user_cookies SET reset_token_temp = 'none' WHERE reset_token_time = '` + resetTokenTime +`'`;
                        mysql.query(query, (err, results) => {
                            if (err) {
                                console.error('Error occured on reset: ', err);
                            }
                        });
                    }
                }
            }
        }
    });
    setTimeout(CheckPasswordRequest, 30000);
}
// setTimeout(CheckPasswordRequest, 10000);