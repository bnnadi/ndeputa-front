// libraries
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var sequelize = require('sequelize');
var passport = require('passport');

// strategies
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    passport.use('v1-local-user', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, function(username, password, done) {

        username = username.toLowerCase().replace(/^[ \t]+|[ \t]+$/ig, '');

        var models = require("./app/models");
        var LoginUserModel = models.user;

        // LoginUserModel
        //     .findOne({
        //         username: username,
        //         deleted: false,
        //     })
        //     .exec(function(err, account) {

        //         if (err || !account) {
        //             done(err, false);
        //             return;
        //         }

        //         var isV1Password = bcrypt.compareSync(password, account.password);

        //         if (isV1Password) {

        //             if (!account.firstLogin) {
        //                 account.firstLogin = new Date();
        //             }

        //             account.lastLogin = new Date();

        //             account.save(done);

        //             return;

        //         }

        //         done(true, null);

        //     });

    }));

    passport.serializeUser(function(user, done) {

        done(null, {
            '_id': user._id,
            'accountType': user.user_tyoe,
        });

    });

    passport.deserializeUser(function(user, done) {

        var id = user._id;

        // var UserModel = mongoose.model('v1User');

        // UserModel
        //     .findOne({
        //         _id: id,
        //         deleted: false,
        //     })
        //     .select('-password')
        //     .exec(done);

    });

    done();
};