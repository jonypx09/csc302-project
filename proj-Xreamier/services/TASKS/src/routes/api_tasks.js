const models = require('../../../PGDB/src/models');
const Task = models.Task;

module.exports = (router) => {

    /**
     * Endpoint for retrieving a specific task for a user.
     */
    router.get('/portal/task/', async (req, res) => {

        const task = await Task.findAll({
            where: {
                user_id: req.query.user_id
            }
        });

        if(task) {
            res.status(200).send(task);
        } else {
            res.sendStatus(404);
        }
    });

    /**
     * Endpoint for creating a new task.
     */
    router.post('/portal/task/', async (req, res) => {

        const task = await Task.create({
            user_id: req.body.user_id,
            task_title: req.body.task_title,
            task_msg: req.body.task_msg,
            completed: false
        });

        if(task) {
            res.status(200).send(task);
        } else {
            res.sendStatus(500);
        }
    });

    /**
     * Endpoint for updating a task for a specific user.
     */
    router.put('/portal/task/', async (req, res) => {

        let newTask = {
            task_title: req.body.task_title,
            task_msg: req.body.task_msg,
            completed: req.body.completed
        };

        const task = await Task.update(
                    newTask, 
                    { 
                        where: {
                            id: req.body.task_id, 
                            user_id: req.body.user_id
                    }
        });

        if(task) {
            res.status(200).send(task);
        } else {
            res.sendStatus(500);
        }
    });

    /**
     * Endpoint for deleting a task for a specific user.
     */
    router.delete('/portal/task/', async (req, res) => {

        const result = await Task.destroy({
            where: {
                user_id: req.body.user_id,
                id: req.body.task_id
            }
        });

        if(result) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

};