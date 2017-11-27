// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var jwt = require('jwt-simple');
var passport = require('passport');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

controller.index = function(req, res) {
    res.sendFile('index.html', {
        root: ROOT + '/public/ndeputa/dist'
    });
};


controller.login = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    // validate the parameters
    var schema = jsSchema({
        username: String,
        password: String.of(8, null, null),
    });

    var invalid = schema.errors({
        username: username,
        password: password
    });

    if (invalid) {

        var errors = ['NNC-01001'];
        // res.nnBunyan(errors);
        console.log(nnLine, new Date());
        res.status(400);
        res.json({
            errors: invalid,
        });
        return;

    }

    passport.authenticate('v1-local-user', function(err, result, info) {

        if (err) {
            errors = ['NNC-01001'];
            console.log(err);
            console.log(nnLine, new Date());
            res.status(500);
            res.json({
                errors: err,
            });
            return;

        }

        if (!result) {
            errors = ['NNC-01002'];
            console.log(nnLine, new Date());
            res.status(404);
            res.json({
                errors: errors,
            });
            return;

        }
        // req.logout();

        req.logIn(result, function(err) {

            if (err) {
                var errors = ['NNC-00002'];
                console.log(err);
                console.log(nnLine, new Date());
                res.status(500);
                res.json({
                    errors: errors,
                });
                return;
            }

            token = jwt.encode({ id: result.id }, process.env.JSON_WEB_TOKEN_KEY);

            res.json({
                result: { user: { '_id': result.id, 'accountType': result.accountType }, token: token }
            });
            return;

        });

    })(req, res, next);

};

controller.logout = function(req, res, next) {

    req.logout();

    req
        .session
        .destroy(function(err) {
            res.redirect('/login');
        });

};

controller.before([
    'login',
], function(req, res, next) {

    if (req.isAuthenticated()) {
        res.status(200);
        res.json({
            result: req.user
        });
        return;
    }

    next();

});

controller.before([
    'index',
], function(req, res, next) {

    if (req.isAuthenticated()) {

        res.redirect('/');
        return;
    }

    next();

});



module.exports = controller;