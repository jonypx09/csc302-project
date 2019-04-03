const apiUtil = require('./api_util');
const request = require('request');

module.exports = function(router) {

    /**
     * Protected route for fetching a note for an existing ticket.
     */
    router.get('/portal/ticket/notes', apiUtil.isLoggedIn, (req, res) => {
        request.get({
            url: 'http://localhost:7000/portal/ticket/notes',
            qs: {
                ticket_id: req.query.ticket_id
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for deleting an existing note from an existing ticket.
     */
    router.delete('/portal/ticket/notes', apiUtil.isLoggedIn, (req, res) => {
        request.delete({
            url: 'http://localhost:7000/portal/ticket/notes',
            form: {
                note_id: req.body.note_id
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for updating the message of a existing note.
     */
    router.put('/portal/ticket/notes', apiUtil.isLoggedIn, (req, res) => {
        request.put({
            url: 'http://localhost:7000/portal/ticket/notes',
            form: req.body
        }, (err, resp, body) => {
            res.send(body);
        });
    });


    /**
     * Protected route for creating a note for an existing ticket.
     */
    router.post('/portal/ticket/notes', apiUtil.isLoggedIn, (req, res) => {
        request.post({
            url: 'http://localhost:7000/portal/ticket/notes',
            form: req.body
        }, (err, resp, body) => {
            res.send(body);
        });
    });


};