const models = require('../../PGDB/src/models');


// Dependencies for the test framework.
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const expect = chai.expect;
const Op = require('sequelize').Op;
const request = require('supertest');

request.agent(server);
chai.should();
chai.use(chaiHttp);

before((done) => {
    server.on("appStarted", () => {
        models.User.destroy({
            where: {
                username: {
                    [Op.like]: 'test-%'
                }
            }
        }).then(() => {
            done();
        });
    });
});

describe("Tasks", () => {
    
    let createTaskId = 0;

    describe('POST /portal/task/', () => {
        it('it should successfully create a new task.', (done) => {
            chai.request(server)
                .post('/portal/task/')
                .send({
                    user_id: 0,
                    task_title: 'Hello World',
                    task_msg: 'CSC302 IS FUN'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.property('user_id', 0);
                    expect(res.body).to.have.property('task_title', 'Hello World');
                    expect(res.body).to.have.property('task_msg', 'CSC302 IS FUN');
                    createTaskId = res.body.id;
                    done();
                });
        });
    });

    describe('GET /portal/task/', () => {
        it('it should retrieve the task that it created before.', (done) => {
            chai.request(server)
                .get('/portal/task/')
                .query({user_id: 0, task_id: createTaskId})
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.have.property('user_id', 0);
                    expect(res.body).to.have.property('task_title', 'Hello World');
                    expect(res.body).to.have.property('task_msg', 'CSC302 IS FUN');  
                    done();   
                });
            });

        it('it should not be able to retrieve tasks that don\'t belong to them', (done) => {
            chai.request(server)
                .get('/portal/task/')
                .query({user_id: 1, task_id: createTaskId})
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should not be able to retrieve tasks for task that doesn\'t exist', (done) => {
            chai.request(server)
                .get('/portal/task/')
                .query({user_id: 0, task_id: -1})
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('PUT /portal/task/', () => {
        it('it should update the task that it created before.', (done) => {
            chai.request(server)
                .put('/portal/task/')
                .send({
                    user_id: 0,
                    task_id: createTaskId,
                    task_title: 'hi'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.be.an('array').that.includes(1);
                    done();
                });
        });

        it('it should not be able to update a task not belonging to them.', (done) => {
            chai.request(server)
                .put('/portal/task/')
                .send({
                    user_id: 2,
                    task_id: createTaskId, 
                    task_title: 'hi'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body).to.be.an('array').that.includes(0);
                    done();
                });
        });
    });

    describe('DELETE /portal/task/', () => {
        it('it should not be able to delete a task not belonging to them.', (done) => {
            chai.request(server)
                .delete('/portal/task/')
                .send({
                    user_id: 2,
                    task_id: createTaskId
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should be able to delete a task belonging to them.', (done) => {
            chai.request(server)
                .delete('/portal/task/')
                .send({
                    user_id: 0,
                    task_id: createTaskId
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});