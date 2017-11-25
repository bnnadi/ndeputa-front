// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var jwt = require('jwt-simple');
var passport = require('passport');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var UserModel = require(BACKEND + '/models').user;

controller.createOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var record = {};

    record.createdById = user.user_id || user._id;
    record.email = req.body.email;
    record.first_name = req.body.first_n;
    record.last_name = req.body.last_n;
    record.user_type = req.body.user_type;

    UserModel
        .findOrCreate({ where: record.email }, { defaults: record })
        .spread(function(user, created) {
            console.log(user.get({ plain: true }));
            console.log(user.toJSON());

            res.json({
                result: user.toJSON()
            });

        });
};

controller.readOne = function(req, res, next) {
    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.query.id || user._id;

    // validate the parameters
    var schema = jsSchema({
        id: Number,
    });

    var invalid = schema.errors({
        id: id
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

    UserModel
        .findById(id)
        .then(function(user) {
            res.json({
                result: user.toJSON()
            });
            return;
        }).catch(function(err) {
            res.status(404);
            res.json({
                errors: errors,
            });
            return;
        });
};

controller.readMany = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';


    UserModel
        .findAndCountAll()
        .then(function(users) {
            res.json({
                result: users
            });
            return;
        }).catch(function(err) {
            res.status(404);
            res.json({
                errors: errors,
            });
            return;
        });
};

controller.updateOne = function(req, res, next) {};

controller.deleteOne = function(req, res, next) {};

controller.generateBarcode = function(req, res, next) {};

controller.before([
    'login',
], function(req, res, next) {

    // if (req.isAuthenticated()) {
    //     res.status(200);
    //     res.json({
    //         result: req.user
    //     });
    //     return;
    // }

    next();

});

controller.before([
    'logout',
    'createOne',
    'readOne'
], function(req, res, next) {

    if (!req.isAuthenticated()) {
        res.status(401);
        res.json({
            errors: ['NNC-00000']
        });
        return;
    }

    next();

});

module.exports = controller;