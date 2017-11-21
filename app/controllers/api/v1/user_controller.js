// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var passport = require('passport');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var UserModel = require(BACKEND + '/models').user;

controller.login = function(req, res, next) {

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

        var errors = ['NNC-01001'];
        // res.nnBunyan(errors);
        console.log(nnLine, new Date());
        res.status(400);
        res.json({
            errors: errors,
        });
        return;

    }

    passport.authenticate('v1-local-user', function(err, result, info) {

        if (err) {
            errors = ['NNC-01001'];
            console.log(nnLine, new Date());
            res.status(500);
            res.json({
                errors: errors,
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
        req.logout();
        console.log("HELLOOOO " + result.get());


        req.login(result, function(err) {

            console.log("HELLOOOO " + result.email);

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

            res.json({
                user: result.get(),
            });

        });

    })(req, res, next);

};

controller.logout = function(req, res, next) {

    req.logout();

    req
        .session
        .destroy(function(err) {
            res.redirect('/');
        });

};

controller.createOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var record = {};

    record.createdById = user.user_id || 0;
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

controller.readOne = function(req, res, next) {};

controller.before([
    'login'
], function(req, res, next) {

    if (req.user && req.user.accountType) {
        res.status(401);
        res.json({
            errors: ['NNC-00001']
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
            errors: ['NNC-00000']
        });
        return;
    }

    next();

});

module.exports = controller;