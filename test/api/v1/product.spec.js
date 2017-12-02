ROOT = __dirname + '/../../..';

var async = require('async');
var dotenv = require('dotenv').config();
var expect = require('expect.js');
var request = require('superagent');

var Sequelize = require("sequelize");

var DummyUser = require(ROOT + '/test/data/user');

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

describe('Product V1 API', function() {

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
});