var LocalStrategy = require('passport-local').Strategy;
var User = require('../db/UserModel');

// expose this function to our app using module.exports
module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            done(null, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email'
        },
        function(email, password, done) {
            User.findOne({ where: {email: email.toLowerCase()} }).then(function(user) {
                if (!user)
                    return done(null, false);
                if (!user.validPassword(password))
                    return done(null, false);
                return done(null, user);
            }, function(reason) {
                return done(reason);
            });
        }));
};