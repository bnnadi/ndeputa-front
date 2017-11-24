// libraries
var async = require('async');
var fs = require('fs');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

controller.index = function(req, res) {
    res.sendFile('index.html', {
        root: ROOT + '/public/ndeputa/dist'
    });
    // res.render('public/login/index');
};



controller.before([
    'index',
], function(req, res, next) {

    if (req.isAuthenticated() && req.user && req.user.accountType) {

        console.log(req.user.accountType);
        var view = '/';
        res.redirect(view);
        return;
    }

    next();

});



module.exports = controller;