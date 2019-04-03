# The Authentication Microservice

As indicated in our high-level design for the application, all requests go through this service before being re-routed to other internal services.

This service requires PostgreSQL installed on your machine.



## Quickstart (Without Docker)

1. Make sure you have PostgreSQL installed - [Click Here](https://www.postgresql.org/download/)
2. Create a database called gradapp and configure your own username and password in the `../PGDB/src/config/config.json` file.
3. Run `npm install` in your CLI.
4. Run `npm start` in your CLI.

## Quickstart (With Docker)
Work in progress, Docker is not compatible with the current structure.

## Adding externally facing routes
In order to add external routes, please place them under SRC/ROUTES and link it up by adding it to the entry point (index.js). There's an authentication middleware located in api_util.js, feel free to use it if you'd like that particular endpoint to be protected.

- Follow the naming convention `api_<service>.js`
- Follow ES6 conventions (avoid var and use let/const).

An example is as follows, say we want to make an API to the tickets for example.

We can call this `api_tickets.js` and create the file under src/routes.

```javascript

/**
 * Your api_tickets.js
 */

// If you want to interact with the models.
const models = require('../../../PGDB/src/models/');

module.exports = function (router) {


  router.post('/create_ticket', isLoggedIn, (req, res) => {
    // DO SOME STUFF HERE
  });

  router.post('/modify_ticket', isLoggedIn, (req, res) => {
      // DO SOME STUFF HERE
  });

}
```

Likewise, you'll need to add a line of code to index.js instantiating your routes.
```javascript
// Declare this at the top.
const Tickets = require('./routes/api_tickets');

// Instantiate it as such, you'll need to pass in the router as a argument.
Tickets(router);

```


