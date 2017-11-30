/*jslint node: true */
ROOT = __dirname + '/../../..';

var assert = require('assert');
var async = require('async');
var expect = require('expect.js');
var request = require('superagent');

var Sequelize = require('sequelize');

var DummyCompany = require(ROOT + '/test/data/company');
var DummyUser = require(ROOT + '/test/data/user');

var dummyCompany = new DummyCompany();
var dummyUserAdmin = new DummyUser();

var config = require(ROOT + '/test/config');

var sequelize = new Sequelize(config.database_name, config.username, config.password, config);

var db = require(ROOT + '/app/models/index');

describe('Company V1 API', function() {

    var adminToken;

    before(function(done) {
        var UserModel = db.user;

        UserModel
            .create(dummyUserAdmin)
            .then(function() {
                done();
            })
            .catch();
    });

    before(function(done) {
        request
            .post('127.0.0.1:3006/api/v1/login.json')
            .send({
                username: 'admin@example.com',
                password: 'password1'
            })
            .end(function(err, res) {

                adminToken = res.body.result.token;
                console.log(adminToken);

                done();
            });
    });

    it('Reads Many Company', function(done) {
        request
            .get('127.0.0.1:3006/api/v1/companies.json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'bearer' + adminToken)
            .end(function(err, res) {
                console.log(res.status);
                done();
            });
    });
});