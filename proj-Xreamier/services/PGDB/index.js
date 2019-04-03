const models = require('./src/models');

models.sequelize.sync().then(() => {
    console.log("Initialized database successfully.");
});