// libraries
var async = require('async');
var fs = require('fs');

// classes
var Controller = require('./base_controller');

// instances
var controller = new Controller();

// controller.index = function(req, res) {

//     res.sendfile('app.html', {
//         root: ROOT + '/public/main/'
//     });

// };

controller.index = function(req, res) {
    res.render('public/login/index');
};



controller.before([
    'index',
    'login',
], function(req, res, next) {

    if (req.user && req.user.accountType) {
        var view;
        switch (req.user.accountType) {
            case 'admin':
                view = '/admin';
                break;
            case 'sales':
                view = '/sales';
                break;
            case 'factory':
                view = '/factory';
                break;
            case 'security':
                view = '/security';
                break;
            default:
                break;
        }
        res.redirect(view);
        return;
    }

    next();

});



module.exports = controller;