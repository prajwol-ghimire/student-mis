const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1124686321609363589/lruUxAIvKBEy7BKOp7j_CScHZ3PeUyf0ZIL1_fBQXMkUDjh6MvAKPy9zxoSY4g7breGM");

function noticeUpload(req, res) {
    const email = req.body.email;
    const notice = req.body.notice_subject;
    const embed = new MessageBuilder()
    .setTitle('Notice')
    .setAuthor(email, 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.xnxx.com')
    // .setURL('https://www.google.com')
    // .addField('First field', 'this is inline', true)
    // .addField('Second field', 'this is not inline')
    .setColor('#00b0f4')
    // .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
    .setDescription(notice)
    .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
    // .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
    .setTimestamp();
    hook.send(embed);
    res.render("noticeupload.hbs")
}


module.exports = noticeUpload;