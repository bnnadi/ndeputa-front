ROOT = __dirname + '/../../..';

var async = require('async');
var dotenv = require('dotenv').config();
var expect = require('expect.js');
var request = require('superagent');

var Sequelize = require("sequelize");
var Chance = require('chance');

var DummyCustomer = require(ROOT + '/test/data/customer');
var DummyUser = require(ROOT + '/test/data/user');

var chance = new Chance();
var dummyCustomer = new DummyCustomer();
var dummyUserAdmin = new DummyUser();

var config = {
    "database_name": process.env.DB_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
};

var sequelize = new Sequelize(config.database_name, config.username, config.password, config);

var db = require(ROOT + '/app/models/index');

describe('Customer V1 API', function() {

    var adminToken;

    before(function(done) {

        var UserModel = db.user;

        UserModel
            .create(dummyUserAdmin)
            .then()
            .catch();

    });

    before(function(done) {
        request
            .post(process.env.APP_URL + '/api/v1/login.json')
            .send({
                username: dummyUserAdmin.email,
                password: dummyUserAdmin.password
            })
            .end(function(err, res) {

                adminToken = res.body.result.token;

                done();
            });
    });

    it('Create Customer', function(done) {

        request
            .post(process.env.APP_URL + '/api/v1/customer.json')
            .set('Token', adminToken)
            .send(dummyCustomer)
            .end(function(err, res) {

                done();
            });
    });

    it('Read Customer', function(done) {

        request
            .get(process.env.APP_URL + '/api/v1/customer.json')
            .set('Token', adminToken)
            .query({
                id: ,
            })
            .end(function(err, res) {

                done();
            });
    });

    it('Read Many Customers', function(done) {

        request
            .get(process.env.APP_URL + '/api/v1/customers.json')
            .set('Token', adminToken)
            .end(function(err, res) {

                done();
            });
    });

    it('Add Customer phone number', function(done) {

        request
            .post(process.env.APP_URL + '/api/v1/customer/addPhoneNumber.json')
            .set('Token', adminToken)
            .send(dummyCustomer)
            .end(function(err, res) {

                done();
            });
    });

    it('Add Customer Address', function(done) {

        request
            .post(process.env.APP_URL + '/api/v1/customer/addAddress.json')
            .set('Token', adminToken)
            .send(dummyCustomer)
            .end(function(err, res) {

                done();
            });
    });

    it('Update Customer Phone Number', function(done) {

        request
            .post(process.env.APP_URL + '/api/v1/customer/updatePhoneNumber.json')
            .set('Token', adminToken)
            .send(dummyCustomer)
            .end(function(err, res) {

                done();
            });
    });

    it('Update Customer Address', function(done) {

        request
            .post(process.env.APP_URL + '/api/v1/customer/updateAddress.json')
            .set('Token', adminToken)
            .send(dummyCustomer)
            .end(function(err, res) {

                done();
            });
    });

    it('Update Customer', function(done) {

        request
            .put(process.env.APP_URL + '/api/v1/customer.json')
            .set('Token', adminToken)
            .send({
                email: chance.email()
            })
            .end(function(err, res) {

                done();
            });
    });

    it.skip('Delete Customer', function(done) {

        request
            .delete(process.env.APP_URL + '/api/v1/customer/' + +'.json')
            .set('Token', adminToken)
            .end(function(err, res) {

                done();
            });
    });
});