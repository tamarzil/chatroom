var User = require("../db/UserModel");

module.exports = function(app, passport) {
    // process the login form
    app.post("/login", passport.authenticate('local-login'), function (req, res) {
        res.json(req.user);
    });

    // handle logout
    app.post("/logout", function (req, res) {
        req.logOut();
        res.sendStatus(200);
    });

    // loggedin
    app.get("/loggedin", function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    // signup
    app.post("/signup", function (req, res) {
        User.findOne({where: {email: req.body.email.toLowerCase()}}).then(function (user) {
            if (user) {
                res.json({ success: false, reason: 'email exists' });
            } else {
                // create user in db
                User.create({
                    email: req.body.email.toLowerCase(),
                    nickname: req.body.nickname,
                    password: User.generateHash(req.body.password)
                }).then(function (user) {
                    req.login(user, function (err) {
                        if (err) {
                            console.log('Failed to login new user: ' + user.email);
                            res.json(null);
                        } else {
                            res.json({ success: false, user: user });
                        }
                    });
                });
            }
        });
    });
}