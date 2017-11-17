// libraries
var async = require('async');
var fs = require('fs');
var passport = require('passport');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

controller.login = function(req, res) {

    var username = req.body.username.toLowerCase().replace(/^[ \t]+|[ \t]+$/ig, '');
    var password = req.body.password;

    passport.authenticate('v1-local-user', function(err, result) {

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

controller.readOne = function(req, res) {};