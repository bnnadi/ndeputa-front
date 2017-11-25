// libraries
var _ = require('lodash');
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var OrderModel = require(BACKEND + '/models').order;

controller.createOne = function(req, res, next) {};

controller.readOne = function(req, res, next) {};

controller.readMany = function(req, res, next) {};

controller.updateOne = function(req, res, next) {};

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