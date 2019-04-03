const models = require('../../PGDB/src/models');


// Dependencies for the test framework.
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index')
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

describe("Ticket", () => {
    


});