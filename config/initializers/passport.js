// libraries
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var passport = require('passport');

// strategies
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    passport.use('v1-local-user', new LocalStrategy(function(username, password, done) {

        username.toLowerCase().replace(/^[ \t]+|[ \t]+$/ig, '');

        var UserModel = require(BACKEND + '/models').user;

        UserModel
            .find({
                where: { username: username }
            })
            .then(function(err, user) {

                console.log(err);
                console.log(user);

                if (err) { return done(err); }
                if (!user) { return done(null, false); }

                done(null, user);
                return;
            });

    }));


    passport.serializeUser(function(user, done) {
        done(null, {
            '_id': user.id,
            'accountType': user.account_type
        });
    });

    passport.deserializeUser(function(user, done) {
        var id = user.id;

        var UserModel = require(BACKEND + '/models').user;

        UserModel
            .findOne({
                where: { user_id: id }
            })
            .then(done);
    });

    done();
};