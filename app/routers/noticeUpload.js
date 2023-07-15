const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1124686321609363589/lruUxAIvKBEy7BKOp7j_CScHZ3PeUyf0ZIL1_fBQXMkUDjh6MvAKPy9zxoSY4g7breGM");

/**
 * Uploads a notice to Discord channel using a webhook
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
function noticeUpload(req, res) {
    const email = req.body.email;
    const notice = req.body.notice_subject;

    // Create a new message embed
    const embed = new MessageBuilder()
        .setTitle('Notice')
        .setAuthor(email, 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.xnxx.com')
        .setColor('#00b0f4')
        .setDescription(notice)
        .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
        .setTimestamp();

    // Send the embed message to the Discord webhook
    hook.send(embed);

    res.render("noticeupload.hbs");
}

module.exports = noticeUpload;
