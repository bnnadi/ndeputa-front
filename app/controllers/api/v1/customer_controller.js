// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

var db = require(BACKEND + '/models');

var CustomerModel = db.customer;
var CAddressModel = db.customer_address;
var CPhoneModel = db.customer_phone_number;

// instances
var controller = new Controller();

controller.createOne = function(req, res, next) {
    var user = req.user || {};

    var record = {};
    record.companyName = res.body.company_name;
    record.customerName = res.body.customer_name;
    record.email = res.body.email;
    record.createdById = user.id;

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

    CustomerModel
        .findOrCreate({
            where: { email: record.email },
            defaults: record,
            includes: [Customer.Address, Customer.Phone]
        })
        .spread(function(customer, created) {
            res.json({
                result: customer.toJSON()
            });
        });
};

controller.readOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    var id = req.query.id;

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

    CustomerModel
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

    CustomerModel
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

controller.updateOne = function(req, res, next) {

    var user = req.user || {};

    var populate = req.body.populate || '';

    CustomerModel
        .update({}, {
            where: {
                id: id,
                deletedAt: {
                    [Op.ne]: null
                }
            }
        })
        .then()
        .catch();
};

controller.addAddress = function(req, res, next) {};

controller.addPhoneNumber = function(req, res, next) {};

controller.updateAddress = function(req, res, next) {};

controller.updatePhoneNumber = function(req, res, next) {};

controller.deleteOne = function(req, res, next) {};

controller.before([
    'deleteOne',
], function(req, res, next) {

    if (!req.isAuthenticated() || req.user.accountType !== 'admin') {
        res.json({
            result: "you don't have access"
        });
        return;
    }
    next();

});

module.exports = controller;