// libraries
var async = require('async');
var fs = require('fs');
var jsSchema = require('js-schema');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

var db = require(BACKEND + '/models');

var UserModel = db.user;
var TimeshhetModel = db.timesheet;

controller.clockInOut = function(req, res, next) {};

controller.Read = function(req, res, next) {};

controller.ReadMany = function(req, res, next) {};

module.exports = controller;