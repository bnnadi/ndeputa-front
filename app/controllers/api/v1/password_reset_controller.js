// libraries
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

controller.index = function(req, res) {
    res.render('public/password_reset/start');
};

controller.start = function(req, res) {};

controller.verify = function(req, res) {};

module.exports = controller;