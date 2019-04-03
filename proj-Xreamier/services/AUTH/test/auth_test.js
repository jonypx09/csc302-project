const models = require('../../PGDB/src/models');


// Dependencies for the test framework.
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
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

describe("Authentication", () => {
    
    let account_details = {
        username: 'test-authenticationtest',
        password: 'csc302isfun'
    };

    describe('POST /signup', () => {
        it('it should successfully sign up a new user.', (done) => {
            chai.request(server)
                .post('/signup')
                .send(account_details)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('it should not allow same username to be signed up twice.', (done) => {
            chai.request(server)
                .post('/signup')
                .send(account_details)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });


    describe('POST /login', () => {
        it('it should login a pre-registered user.', (done) => {
            chai.request(server)
                .post('/login')
                .send(account_details)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('it should not login a user with incorrect credentials.', (done) => {
            let wrong_acct = {
                username: 'boohoo',
                password: 'raymondgao'
            };

            chai.request(server)
                .post('/login')
                .send(wrong_acct)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });

        });
    });

    describe('GET /test_protected', () => {
        it('it should not allow user to access protected area.', (done) => {
            chai.request(server)
                .get('/test_protected')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('it should allow a logged in user to access protected area.', (done) => {
            const agent = chai.request.agent(server);
            agent.post('/login')
                .send(account_details)
                .end(() => {
                    agent.get('/test_protected')
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

});