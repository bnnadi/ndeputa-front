// libraries
var async = require('async');
var fs = require('fs');

// classes
var Controller = require(ROOT + '/app/controllers/base_controller');

// instances
var controller = new Controller();

controller.index = function(req, res) {
    res.sendFile('app.html', {
        root: ROOT + '/public/ndeputa-admin/'
    });
};



controller.before([
    'index',
], function(req, res, next) {

    if (!req.isAuthenticated() || req.user.accountType !== 'admin') {
        res.redirect('/');
        return;
    }
    next();

});



module.exports = controller;