const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const models = require('../../PGDB/src/models');
const promiseRouter = require('express-promise-router');
const dotenv = require('dotenv');
const path = require('path');

const AccountCreation = require('../../PGDB/src/config/passport');
const Authentication = require('./routes/api_authentication');
const Dashboard = require('./routes/api_dashboard');
const Tickets = require('./routes/api_tickets');
const Notes = require('./routes/api_notes');
const Test = require('./routes/api_test');
const Tasks = require('./routes/api_tasks');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.use(express.static( path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

AccountCreation(passport, models.User);
Authentication(router, passport);
Tickets(router);
Notes(router);
Tasks(router);
Test(router);
Dashboard(router);


/**
 * Database initialization and initializing server for requests.
 */
models.sequelize.sync().then(() => {
    console.log("DATABASE SUCCESSFULLY CONNECTED.");
    app.listen(3000, (err) => {
        if (!err) {
            console.log("Server is ONLINE.");
            app.emit("appStarted");
        } else {
            console.log(err);
        }
    });
}).catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
});


/**
 * Routes, TODO: Export them, using Express Router.
 */
app.get('/', (req, res) => {
    res.redirect('/portal/dashboard');
});

// Primarily for testing.
module.exports = app;