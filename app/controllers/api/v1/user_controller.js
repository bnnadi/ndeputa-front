// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var passport = require('passport');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var UserModel = require(BACKEND + '/models').User;

controller.login = function(req, res) {

    var username = req.body.username.toLowerCase().replace(/^[ \t]+|[ \t]+$/ig, '');
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

        var errors = ['NRC-01001'];
        // res.nrBunyan(errors);
        console.log(bnLine, new Date());
        res.status(400);
        res.json({
            errors: errors,
        });
        return;

    }

    passport.authenticate('local', function(err, result) {

        if (err) {

            errors = ['NRC-01001'];
            console.log(bnLine, new Date());
            res.status(500);
            res.json({
                errors: errors,
            });
            return;

        }

        if (!result) {

            errors = ['NRC-01001'];
            console.log(bnLine, new Date());
            res.status(404);
            res.json({
                errors: errors,
            });
            return;

        }

        req.logout();

        req.login(result, {}, function(err) {

            if (err) {
                var errors = ['BNC-00002'];
                console.log("WHAT!!!");
                console.log(bnLine, new Date());
                res.status(500);
                res.json({
                    errors: errors,
                });
                return;
            }

            res.json({
                user: result,
            });

        });

    })(req, res);

};

controller.logout = function(req, res) {

    req.logout();

    req
        .session
        .destroy(function(err) {
            res.redirect('/login');
        });

};

controller.createOne = function(req, res) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var record = {};

    record.createdById = user.user_id || 0;
    record.username = req.body.username || "user_" + req.body.last_n;
    record.email = req.body.email;
    record.first_name = req.body.first_n;
    record.last_name = req.body.last_n;
    record.user_type = req.body.user_type;

    UserModel
        .findOrCreate({ where: record.email }, { defaults: record })
        .spread(function(user, created) {
            console.log(user.get({
                plain: true
            }));
            console.log(created);

            res.json({
                result: user.get()
            });

        });
};

controller.readOne = function(req, res) {};

controller.before([
    'login'
], function(req, res, next) {

    if (req.user && req.user.accountType) {
        res.status(401);
        res.json({
            errors: ['BNC-00001']
        });
        return;
    }

    next();

});

controller.before([
    'logout',
    'readOne'
], function(req, res, next) {

    if (!req.user || !req.user.accountType) {
        res.status(401);
        res.json({
            errors: ['BNC-00000']
        });
        return;
    }

    next();

});

module.exports = controller;