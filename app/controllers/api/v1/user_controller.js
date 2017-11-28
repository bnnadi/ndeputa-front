// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');
var jwt = require('jwt-simple');
var generatePsswrd = require('password-generator');
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

    record.createdById = user.id;
    record.email = req.body.email;
    record.first_name = req.body.first_n;
    record.last_name = req.body.last_n;
    record.user_type = req.body.user_type;
    record.password = generatePsswrd();

    // phone number
    if (res.body.phone_number) {
        record.number = res.body.phone_number;
    }

    // address
    if (res.body.address) {
        record.address = res.body.address;
        record.city = res.body.city;
        record.state = res.body.state;
        record.country = res.body.country;
        record.zip = res.body.zip || null;
    }

    UserModel
        .findOrCreate({
            where: { email: record.email },
            defaults: record,
            attributes: ['id', 'email', 'user_type', 'last_name', 'first_name', 'createdAt'],
            include: [User.Address, User.Phone]
        })
        .spread(function(user, created) {
            res.json({
                result: user.toJSON()
            });
        });
};

controller.readOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.query.id || user.id;

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
            errors: invalid,
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
                errors: err,
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

controller.addAddress = function(req, res, next) {};

controller.addPhoneNumber = function(req, res, next) {};

controller.updateAddress = function(req, res, next) {};

controller.updatePhoneNumber = function(req, res, next) {};

controller.generateQRCode = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.body.id;

    UserModel
        .findById(id)
        .then(function(user) {
            if (!user) {
                res.status(404);
                res.json({
                    errors: 'Record not Found',
                });
                return;
            }
        })
        .catch(function(err) {
            res.status(404);
            res.json({
                errors: err,
            });
            return;
        });
};

controller.deleteOne = function(req, res, next) {};

controller.before([
    '*'
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

controller.before(['deleteOne'], function(req, res, next) {});

module.exports = controller;