// const { Webhook, MessageBuilder } = require('discord-webhook-node');
const mysql = require("./connection").con;
const path = require('path');
const { DATE } = require('sequelize');
// const hook = new Webhook("https://discord.com/api/webhooks/1124686321609363589/lruUxAIvKBEy7BKOp7j_CScHZ3PeUyf0ZIL1_fBQXMkUDjh6MvAKPy9zxoSY4g7breGM");

/**
 * Uploads a notice to Discord channel using a webhook
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function noticeUpload(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const timestamp = Date.now()
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because month indexes start from 0
    const day = date.getDate();
    if (req.file){
        files = req.file.path
        const fileName = path.basename(files);
        const query = `INSERT INTO notice_data (title, description, uploded_year, uploded_month, uploded_day, notice_image) VALUES ('${title}','${description}','${year}','${month}','${day}','${fileName}')`;
        mysql.query(query, (err, results) => {
            if (err) {
                res.redirect("/uploadnotice",{error: true})
            }
            else{
                res.redirect("/notice")
            }
        });
    }

            //     const embed = new MessageBuilder()
            //     .setTitle('Notice')
            //     .setAuthor(email, 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.xnxx.com')
            //     .setColor('#00b0f4')
            //     .setDescription(notice)
            //     .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
            //     .setTimestamp();      // // Send the embed message to the Discord webhook
            //      hook.send(embed);
}

module.exports = noticeUpload;
