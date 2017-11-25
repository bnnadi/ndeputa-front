var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');

var public = require(BACKEND + '/controllers/public_controller');

var v1Admin = require(BACKEND + '/controllers/api/v1/admin_controller');
var v1Customer = require(BACKEND + '/controllers/api/v1/customer_controller');
var v1Company = require(BACKEND + '/controllers/api/v1/company_controller');
var v1Order = require(BACKEND + '/controllers/api/v1/order_controller');
var v1PasswordReset = require(BACKEND + '/controllers/api/v1/password_reset_controller');
var v1Product = require(BACKEND + '/controllers/api/v1/product_controller');
var v1User = require(BACKEND + '/controllers/api/v1/user_controller');

module.exports = function routes() {

    // access
    this.post('/api/v1/login.json', public.login);
    this.get('/api/v1/logout', public.logout);

    this.get('/api/v1/companies.json', v1Company.readMany);

    // customers
    this.post('/api/v1/customer.json', v1Customer.createOne);
    this.get('/api/v1/customer.json', v1Customer.readOne);
    this.get('/api/v1/customers.json', v1Customer.readMany);
    this.put('/api/v1/customer.json', v1Customer.updateOne);
    this.delete('/api/v1/customer/:id.json', v1Customer.deleteOne);

    // orders
    this.post('/api/v1/order.json', v1Order.createOne);
    this.get('/api/v1/order.json', v1Order.readOne);
    this.get('/api/v1/orders.json', v1Order.readMany);
    this.put('/api/v1/order.json', v1Order.updateOne);
    this.delete('/api/v1/order/:id.json', v1Order.deleteOne);

    // products
    this.post('/api/v1/product.json', v1Product.createOne);
    this.get('/api/v1/product.json', v1Product.readOne);
    this.get('/api/v1/products.json', v1Product.readMany);
    this.put('/api/v1/product.json', v1Product.updateOne);
    this.delete('/api/v1/product/:id.json', v1Product.deleteOne);

    // password reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // user
    this.post('/api/v1/user.json', v1User.createOne);
    this.get('/api/v1/user.json', v1User.readOne);
    this.get('/api/v1/users.json', v1User.readMany);
    // this.put('/api/v1/user.json', v1User.updateOne);
    // this.delete('/api/v1/user/:id.json', v1User.deleteOne);

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

    this.get('*', public.index);

};