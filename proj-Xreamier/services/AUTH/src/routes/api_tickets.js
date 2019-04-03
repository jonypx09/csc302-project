const apiUtil = require('./api_util');
const request = require('request');

module.exports = function(router) {

    /**
     * Protected route for fetching a ticket.
     * The params should include the ticket id that we want to be retrieving.
     */
    router.get('/portal/ticket/', apiUtil.isLoggedIn, (req, res) => {
        request.get({
            url: 'http://localhost:7000/portal/ticket/',
            qs: {
                user_id: req.user.id
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });


    /**
     * Protected route for fetching all tickets.
     * This route is only accessible by admin/budget director.
     */
    router.get('/portal/ticket/all', apiUtil.isLoggedIn, (req, res) => {
        request.get({
            url: 'http://localhost:7000/portal/ticket/all',
            qs: {
                user_id: req.user.username
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for updating an existing ticket.
     * The request should have the two fields
     * - The ticket that we want to update
     * - The new status of the ticket
     */
    router.put('/portal/ticket/', apiUtil.isLoggedIn, (req, res) => {
        request.put({
            url: 'http://localhost:7000/portal/ticket',
            form: req.body
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for creating a new ticket.
     * The request should have two fields in the post request.
     * - The assigner
     * - The assignee
     */
    router.post('/portal/ticket/', apiUtil.isLoggedIn, (req, res) => {
        request.post({
            url: 'http://localhost:7000/portal/ticket',
            form: req.body
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for adding a new assignee to a ticket.
     */
    router.post('/portal/ticket/add_assignee', apiUtil.isLoggedIn, (req, res) => {
        request.post({
            url: 'http://localhost:7000/portal/ticket/add_assignee',
            form: req.body
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for deleting an existing ticket.
     */
    router.delete('/portal/ticket/', apiUtil.isLoggedIn, (req, res) => {
        request.delete({
            url: 'http://localhost:7000/portal/ticket/',
            form: req.body
        }, (err, resp, body) => {
            res.send(body);
        });
    });
};
