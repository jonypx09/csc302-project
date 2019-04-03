const bCrypt = require('bcrypt-nodejs');

var LocalStrategy = require('passport-local').Strategy;


module.exports = function(passport, user) {

    const User = user;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {

        var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            if (user) {
                return done(null, false, {
                    message: 'That username is already in use.'
                });
            } else {
                let userPassword = generateHash(password);
                let data = {
                    username: username,
                    password: userPassword,
                    permissions: 1
                };

                User.create(data).then(function(newUser) {

                    if (!newUser) {
                        return done(null, false);
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        let isValidPassword = (password, verifiedPassword) => {
            return bCrypt.compareSync(verifiedPassword, password);
        };

        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {

            if (!user) {
                return done(null, false, {
                    message: 'Username/Password does not exist.'
                });
            }

            if (!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Username/Password does not exist.'
                });
            }

            return done(null, user.get());

        }).catch(function(err) {
            console.log("Error: ", err);
            return done(null, false, {
                message: 'Something went wrong!'
            });
        });

    }));
};