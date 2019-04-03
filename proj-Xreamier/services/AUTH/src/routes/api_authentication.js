module.exports = function(router, passport) {

    router.get('/login', (req, res) => {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local-signin'), (req, res) => {
        // res.sendStatus(200);
        res.redirect('/portal/dashboard/');
    });

    router.get('/signup', (req, res) => {
        res.render('signup');
    });
    
    router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
        // res.sendStatus(200);
        res.redirect('/portal/dashboard/');
    });

    router.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            }
            res.redirect('/');
        });
    });

};