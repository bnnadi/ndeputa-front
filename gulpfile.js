var async = require('async');
var chalk = require('chalk');
var dotenv = require('dotenv').config();
var gulp = require('gulp'),
    gutil = require('gulp-util');


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

var db = require(__dirname + '/app/models/index');

var adminId;

gulp.task('default', function() {
    return gutil.log('Gulp is running!');
});

gulp.task('v1-test-db', function() {
    return db.sequelize.sync({ force: true, match: /_test$/ }).catch();
});

gulp.task('v1-create-company', function() {
    var Company = db.company;
    var companies = [{
            companyName: "Yana"
        },
        {
            companyName: "Willow"
        }
    ];

    return Company
        .bulkCreate(companies)
        .then(function(result) {
            console.log(result);
        })
        .catch(function(err) {
            console.log(err);
        });
});

gulp.task('v1-create-admin', function() {
    var User = db.user;
    var Address = db.user_address;
    var Phone = db.user_phone_number;

    var admin = {
        email: 'admin@example.com',
        firstName: chance.first(),
        lastName: chance.last(),
        password: 'password1',
        accountType: 'admin'
    };


    User
        .create(admin)
        .then(function(user) {
            return user;
        })
        .catch(function(err) {
            console.log(err);
        });
    return;
});