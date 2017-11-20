var async = require('async');
var chalk = require('chalk');
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

var db = require(__dirname + '/app/models');

var adminId;

gulp.task('v1-test-db', function() {
    db.sequelize.sync({ force: true, match: /_test$/ });
});

gulp.task('v1-create-admins', function() {
    var User = db.user;
    var Address = db.user_address;
    var Phone = db.user_phone_number;

    var admin = {
        email: chance.email(),
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        accountType: 'admin'
    };

    async.waterfall([
            function(cb) {
                console.log(admin);
                User
                    .create({ where: { admin } })
                    .then(function(user) {
                        console.log(user);
                        adminId = user.id;
                        async.parallel([
                            function(callback) {
                                addressObj = {
                                    user_id: user.id,
                                    address: chance.address(),
                                    city: chance.city(),
                                    state: chance.state({ full: true }),
                                    country: chance.country({ full: true }),
                                    createdBy_id: adminId
                                };
                                Address
                                    .create({ where: addressObj })
                                    .then(callback)
                                    .catch(callback);
                            },
                            function(callback) {
                                phoneObj = {
                                    user_id: user.id,
                                    phone_number: chance.phone(),
                                    createdBy_id: adminId
                                };
                                Phone
                                    .create({ where: phoneObj })
                                    .then(callback)
                                    .catch(callback);
                            }
                        ], function(err, results) {
                            if (err) {
                                // delete records
                                console.log(chalk.yellow("admin create"));
                                return cb(err);
                            }

                            cb();
                        });
                        return;
                    })
                    .catch(function(err) {
                        console.log(chalk.yellow("Admin Create"));
                        cb(err);
                        return;
                    });
            },
            function(admin, cb) {

                async.each(['pmanager', 'smanager'], function(type, next) {
                    var user = {
                        email: chance.email(),
                        first_name: chance.first(),
                        last_name: chance.last(),
                        password: 'password1',
                        accountType: type,
                        createdBy_id: adminId
                    };

                    User
                        .create({ where: { user } })
                        .then(function(user) {
                            async.parallel([
                                function(callback) {
                                    addressObj = {
                                        user_id: user.id,
                                        address: chance.address(),
                                        city: chance.city(),
                                        state: chance.state({ full: true }),
                                        country: country({ full: true }),
                                        createdBy_id: adminId
                                    };
                                    Address
                                        .create({ where: addressObj })
                                        .then(cllback)
                                        .catch(callback);
                                },
                                function(callback) {
                                    phoneObj = {
                                        user_id: user.id,
                                        phone_number: chance.phone(),
                                        createdBy_id: adminId
                                    };
                                    Phone
                                        .create({ where: phoneObj })
                                        .then(callback)
                                        .catch(callback);
                                }
                            ], function(err, results) {
                                if (err) {
                                    // delete records
                                    console.log(admin);
                                    console.log(chalk.yellow(type + " create"));
                                    return cb(err);
                                }

                                cb();
                            });

                        })
                        .catch(next);
                }, function(err) {
                    if (err) {
                        console.log(chalk.yellow("Each"));
                        console.log(chalk.red(err));
                        return cb(err);
                    }
                    cb();
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(chalk.yellow("Water"));
                console.log(chalk.red(err));
                return;
            }
            console.log(chalk.green("Success!!"));
            console.log(chalk.blue("Admin email is: ") + admin.email);
        });
});