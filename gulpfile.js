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
    async.each([
            {},
            {},
            {},
        ],
        function(user, cb) {
            User
                .create({ where: user })
                .then(cb)
                .catch(cb);
        },
        function(err) {
            if (err) { console.log(err); } else { console.log("Success!!"); };
        });
});
gulp.task('v1-sales-agent', function() {});
gulp.task('v1-factory-worker', function() {});
gulp.task('v1-security-worker', function() {});