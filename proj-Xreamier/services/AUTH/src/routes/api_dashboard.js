const apiUtil = require('./api_util');
const request = require('request');

module.exports = function(router) {

    /**
     * Protected route for getting to the dashboard.
     */
    router.get('/portal/dashboard', apiUtil.isLoggedIn, (req, res) => {
        res.render('dashboard');
    });

    router.get('/createTask', (req, res) => {
        res.render('createTask');
    });

    router.get('/tickets', (req, res) => {
        res.render('tickets');
    });

    router.get('/mytasks', (req, res) => {
        res.render('tasks');
    });


};