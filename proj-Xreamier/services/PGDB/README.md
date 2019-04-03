# The Database Microservice

The database microservice uses PostgreSQL as it's DB Engine and Sequelize as it's ORM and migration manager. 
There are several models to the database, a more in-depth diagram can be found in our docs folder.

In short there are 4 major models that we decided to start off with.
- User model
- Ownership model
- Note model
- Ticket model

## Quickstart (Without Docker)
1. Make sure you have PostgreSQL installed - [Click Here](https://www.postgresql.org/download/)
2. Create a database called gradapp and configure your own username and password in the `src/config/config.json` file.
3. Run `npm install` in your CLI.
4. Run `npm start` in your CLI.

(Optional): Run ```sequelize db:migrate``` to run any migrations that you've generated.


## Quickstart (With Docker)
Work in progress, Docker is currently not fully supported.