// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var ProductModel = require(BACKEND + '/models').product;

controller.createOne = function(req, res, next) {
    var user = req.user || {};

    var record = {};
    record.createdById = user.user_id || user._id;
    record.companyId = req.body.company_id;
    record.description = req.body.description;
    record.qty = req.body.qty;

    ProductModel
        .create(record)
        .then(function(product) {
            res.json({
                result: product
            });
            return;
        })
        .catch(function(err) {
            res.status(404);
            res.json({
                error: err
            });
            return;
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
            errors: errors,
        });
        return;

    }

    ProductModel
        .findById(id)
        .then(function(product) {
            res.json({
                result: product
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

    ProductModel
        .findAndCountAll()
        .then(function(products) {
            console.log(products);
            res.json({
                result: products
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

};

controller.deleteOne = function(req, res, next) {};

controller.generateBarcode = function(req, res, next) {};



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