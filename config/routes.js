var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');
var passport = require('passport');

var public = require(BACKEND + '/controllers/public_controller');

var v1Admin = require(BACKEND + '/controllers/api/v1/admin_controller');
var v1Customer = require(BACKEND + '/controllers/api/v1/customer_controller');
var v1Company = require(BACKEND + '/controllers/api/v1/company_controller');
var v1Order = require(BACKEND + '/controllers/api/v1/order_controller');
var v1PasswordReset = require(BACKEND + '/controllers/api/v1/password_reset_controller');
var v1Product = require(BACKEND + '/controllers/api/v1/product_controller');
var v1Time = require(BACKEND + '/controllers/api/v1/timesheet_controller');
var v1User = require(BACKEND + '/controllers/api/v1/user_controller');

module.exports = function routes() {

    // access
    this.post('/api/v1/login.json', passport.authenticate('jwt', { session: false }), public.login);
    this.get('/api/v1/logout', passport.authenticate('jwt', { session: false }), public.logout);

    this.get('/api/v1/authenticate');

    // reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // timesheet
    this.post('/api/v1/clockInOut', v1Time.clockInOut);

    // company
    this.get('/api/v1/companies.json', passport.authenticate('jwt', { session: false }), v1Company.readMany);

    // customers
    this.post('/api/v1/customer.json', passport.authenticate('jwt', { session: false }), v1Customer.createOne);
    this.get('/api/v1/customer.json', passport.authenticate('jwt', { session: false }), v1Customer.readOne);
    this.get('/api/v1/customers.json', passport.authenticate('jwt', { session: false }), v1Customer.readMany);
    this.put('/api/v1/customer.json', passport.authenticate('jwt', { session: false }), v1Customer.updateOne);
    this.post('/api/v1/customer/addAddress.json', passport.authenticate('jwt', { session: false }), v1Customer.addAddress);
    this.post('/api/v1/customer/addPhoneNumber.json', passport.authenticate('jwt', { session: false }), v1Customer.addPhoneNumber);
    this.put('/api/v1/customer/updateAddress.json', passport.authenticate('jwt', { session: false }), v1Customer.updateAddress);
    this.put('/api/v1/customer/updatePhoneNumber.json', passport.authenticate('jwt', { session: false }), v1Customer.updatePhoneNumber);
    this.put('/api/v1/user/removeAddress.json', passport.authenticate('jwt', { session: false }), v1Customer.removeAddress);
    this.put('/api/v1/user/removePhoneNumber.json', passport.authenticate('jwt', { session: false }), v1Customer.removePhoneNumber);
    this.delete('/api/v1/customer/:id.json', passport.authenticate('jwt', { session: false }), v1Customer.deleteOne);

    // orders
    this.post('/api/v1/order.json', passport.authenticate('jwt', { session: false }), v1Order.createOne);
    this.get('/api/v1/order.json', passport.authenticate('jwt', { session: false }), v1Order.readOne);
    this.get('/api/v1/orders.json', passport.authenticate('jwt', { session: false }), v1Order.readMany);
    this.put('/api/v1/order.json', passport.authenticate('jwt', { session: false }), v1Order.updateOne);
    this.delete('/api/v1/order/:id.json', passport.authenticate('jwt', { session: false }), v1Order.deleteOne);

    // products
    this.post('/api/v1/product.json', passport.authenticate('jwt', { session: false }), v1Product.createOne);
    this.get('/api/v1/product.json', passport.authenticate('jwt', { session: false }), v1Product.readOne);
    this.get('/api/v1/products.json', passport.authenticate('jwt', { session: false }), v1Product.readMany);
    this.put('/api/v1/product.json', passport.authenticate('jwt', { session: false }), v1Product.updateOne);
    this.get('/api/v1/product/generateBarcode', passport.authenticate('jwt', { session: false }), v1Product.generateBarcode);
    this.delete('/api/v1/product/:id.json', passport.authenticate('jwt', { session: false }), v1Product.deleteOne);

    // timesheet
    this.get('/api/v1/clockInOut', passport.authenticate('jwt', { session: false }), v1Time.Read);
    this.get('/api/v1/clockInOut', passport.authenticate('jwt', { session: false }), v1Time.ReadMany);

    // user
    this.post('/api/v1/user.json', passport.authenticate('jwt', { session: false }), v1User.createOne);
    this.get('/api/v1/user.json', passport.authenticate('jwt', { session: false }), v1User.readOne);
    this.get('/api/v1/users.json', passport.authenticate('jwt', { session: false }), v1User.readMany);
    this.post('/api/v1/user/addAddress.json', passport.authenticate('jwt', { session: false }), v1User.addAddress);
    this.post('/api/v1/user/addPhoneNumber.json', passport.authenticate('jwt', { session: false }), v1User.addPhoneNumber);
    this.put('/api/v1/user/updateAddress.json', passport.authenticate('jwt', { session: false }), v1User.updateAddress);
    this.put('/api/v1/user/updatePhoneNumber.json', passport.authenticate('jwt', { session: false }), v1User.updatePhoneNumber);
    this.put('/api/v1/user/removeAddress.json', passport.authenticate('jwt', { session: false }), v1User.removeAddress);
    this.put('/api/v1/user/removePhoneNumber.json', passport.authenticate('jwt', { session: false }), v1User.removePhoneNumber);
    this.get('/api/v1/user/generateQRCode', passport.authenticate('jwt', { session: false }), v1User.generateQRCode);
    // this.put('/api/v1/user.json', passport.authenticate('jwt', { session: false }),  v1User.updateOne);
    // this.delete('/api/v1/user/:id.json', passport.authenticate('jwt', { session: false }),  v1User.deleteOne);

    this.get('/values/strings.js', function(req, res) {

        var output = {};

        async.each([
            'ndeputa'
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
            'ndeputa'
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

    this.get('*', public.index);

};