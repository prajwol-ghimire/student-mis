const mysql = require("./connection").con;

// Function to introduce a delay
function delay_time() {
    return;
}

// Function to check password reset requests and update the database accordingly
function CheckPasswordRequest() {
    // Query to fetch the reset_token_time from user_cookies table
    const query = `SELECT reset_token_time from user_cookies`;
    mysql.query(query, (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {
                // Iterate through the results
                for (let i = 0; i < results.length; i++) {
                    const resetTokenTime = results[i].reset_token_time;
                    currentServerDate = Date.now();
                    console.log(currentServerDate);

                    // Check if the reset token time has expired
                    if (resetTokenTime < currentServerDate) {
                        // Update the reset_token_temp and reset_token_time to default values
                        const query = `UPDATE user_cookies SET reset_token_temp = 'none', reset_token_time = '99999999999999' WHERE reset_token_time = '` + resetTokenTime +`'`;
                        mysql.query(query, (err, results) => {
                            if (err) {
                                console.error('Error occurred during reset: ', err);
                            } else {
                                // Delay the execution by 5 seconds before continuing
                                setTimeout(delay_time, 5000);
                            }
                        });
                    }
                }
            }
        }
    });

    // Call the CheckPasswordRequest function again after 30 seconds
    // setTimeout(CheckPasswordRequest, 30000);
}

// Call the CheckPasswordRequest function initially and repeat every 30 seconds
setTimeout(CheckPasswordRequest, 30000);
