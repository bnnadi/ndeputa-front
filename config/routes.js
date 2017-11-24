var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');

var public = require(BACKEND + '/controllers/public_controller');

var v1Admin = require(BACKEND + '/controllers/api/v1/admin_controller');
var v1PasswordReset = require(BACKEND + '/controllers/api/v1/password_reset_controller');
var v1User = require(BACKEND + '/controllers/api/v1/user_controller');

module.exports = function routes() {

    this.get('/', public.index);

    this.post('/api/v1/login.json', v1User.login);
    this.get('/api/v1/logout', v1User.logout);

    // working sites
    // this.get('/', v1Admin.index);
    // this.get('/marketplace', v1Admin.index);
    // this.get('/secure', v1Admin.index);
    // this.get('/stock', v1Admin.index);

    this.get('/values/strings.js', function(req, res) {

        var output = {};

        async.each([
            'ndeputa',
            'ndeputa-admin',
            'ndeputa-factory',
            'ndeputa-sales',
            'ndeputa-security'
        ], function(item, next) {

            fs.readFile(ROOT + '/public/' + item + '/bower.json', 'utf8', function(err, data) {

                if (err) {
                    next(null);
                    return;
                }

                var parsedBower;

                try {
                    parsedBower = JSON.parse(data);
                } catch (e) {

                }

                output[item] = parsedBower.version;

                next();

            });

        }, function() {
            var values = _.extend(process.values.STRINGS, output);
            res.send('window.STRINGS=' + JSON.stringify(values));
        });
    });

    this.get('/values/errors.js', function(req, res) {
        var output = {};

        async.each([
            'ndeputa',
            'ndeputa-admin',
            'ndeputa-factory',
            'ndeputa-sales',
            'ndeputa-security'
        ], function(item, next) {

            fs.readFile(FRONTEND + '/' + item + '/bower.json', 'utf8', function(err, data) {

                if (err) {
                    // log err
                    next(null);
                    return;
                }

                var parsedBower;

                try {
                    parsedBower = JSON.parse(data);
                } catch (e) {

                }

                output[item] = parsedBower.version;

                next();

            });

        }, function() {
            var values = _.extend(process.values.ERRORS, output);
            res.send('window.ERRORS=' + JSON.stringify(values));
        });
    });

    // password reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // user
    this.post('/api/v1/user.json', v1User.createOne);
    this.get('/api/v1/user.json', v1User.readOne);
    // this.put('/api/v1/user.json', v1User.updateOne);
    // this.del('/api/v1/user.json', v1User.deleteOne);


};