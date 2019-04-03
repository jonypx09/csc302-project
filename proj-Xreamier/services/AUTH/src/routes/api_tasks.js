const apiUtil = require('./api_util');
const request = require('request');

module.exports = function(router) {

    /**
     * Protected route for retrieving all tasks for a user.
     */
    router.get('/portal/task/', apiUtil.isLoggedIn, (req, res) => {
        request.get({
            url: 'http://localhost:6000/portal/task/',
            qs: {
                user_id: req.user.id
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for creating a new task.
     */
    router.post('/portal/task/', apiUtil.isLoggedIn, (req, res) => {
        request.post({
            url: 'http://localhost:6000/portal/task/',
            form: {
                user_id: req.user.id,
                task_title: req.body.task_title,
                task_msg: req.body.task_msg
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for updating an existing task.
     */
    router.put('/portal/task/', apiUtil.isLoggedIn, (req, res) => {
        request.put({
            url: 'http://localhost:6000/portal/task/',
            form: {
                user_id: req.user.id,
                task_id: req.body.task_id,
                task_title: req.body.task_title,
                task_msg: req.body.task_msg,
                completed: req.body.completed
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });

    /**
     * Protected route for deleting a task.
     */
    router.delete('/portal/task/', apiUtil.isLoggedIn, (req, res) => {
        request.delete({
            url: 'http://localhost:6000/portal/task/',
            form: {
                user_id: req.user.id,
                task_id: req.body.task_id
            }
        }, (err, resp, body) => {
            res.send(body);
        });
    });


};