const apiUtil = require('./api_util');


module.exports = function(router) {

    // For protected areas.
    router.get('/test_protected', apiUtil.isLoggedIn, (req, res) => {
        res.sendStatus(200);
    });

};