const SparkPost = require('sparkpost');

module.exports = function(router) {

    const client = new SparkPost('035ce2d60dacd8cf5aae61719fa01188d99157c4');

    router.post('/email/ticket', (req, res) => {
        client.transmissions.send({
                options: {
                    sandbox: true
                },
                content: {
                    from: 'hello@sparkpostbox.com',
                    subject: 'Ticket Updated ' + req.body.ticket_id,
                    html: "<html>" +
                        "   <body>" +
                        "     <p>Hi " + req.body.username + ",</p>" +
                        "     <p>We're notifying you that your ticket " + req.body.ticket_id + " has been updated!" +
                        "     <p>Cheers,<br>" +
                        "     The Graduate Applications Team<br>" +
                        "     </p>" +
                        '   </body>' +
                        '</html>'
                },
                recipients: [
                    { address: req.body.username }
                ]
            })
            .then(data => {
                console.log('Sent off an email to ' + req.body.username);
                console.log(data);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log('An error occurred transmitting the message.');
                console.log(err);
                res.sendStatus(500);
            });
    });
};