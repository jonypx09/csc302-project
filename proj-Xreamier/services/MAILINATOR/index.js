const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const models = require('../PGDB/src/models');
const promiseRouter = require('express-promise-router');
const dotenv = require('dotenv');

const Email = require('./routes/api_email');

dotenv.config();
const router = promiseRouter();
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'there is a fire in my tummy',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(router);

Email(router);


/**
 * Database initialization and initializing server for requests.
 */
models.sequelize.sync().then(() => {
    console.log("DATABASE SUCCESSFULLY CONNECTED.");
    app.listen(4000, (err) => {
        if (!err) {
            console.log("Server is ONLINE.");
        } else {
            console.log(err);
        }
    });
}).catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
});

module.exports = app;