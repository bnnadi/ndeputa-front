var async = require('async');
var dotenv = require('dotenv').config();
var gulp = require('gulp');


var Chance = require('chance');
var Sequelize = require("sequelize");

var config = {
    "database_name": process.env.DB_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT
};
var chance = new Chance();
var sequelize = new Sequelize(config.database_name, config.username, config.password, config);

var models = require(__dirname + '/app/models');

gulp.task('v1-test-db', function() {
    models.sequelize.sync({ force: true, match: /_test$/ });
});

gulp.task('v1-admin', function() {
    var User = models.user;
    var admin = {
        email: chance.email(),
        first_name: chance.first(),
        last_name: chance.last(),
        password: chance.first(),
        accountType: 'admin'
    };

    async.waterfall(,
        function(err) {
            if (err) { return console.log(err); }
            console.log("Success!!");
        });
});
gulp.task('v1-sales-agent', function() {});
gulp.task('v1-factory-worker', function() {});
gulp.task('v1-security-worker', function() {});