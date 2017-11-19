// libraries
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var ExtractJwt = require('passport-jwt');

// strategies
var JwtStrategy = require('passport-jwt').Strategy
var LocalStrategy = require('passport-local').Strategy

module.exports = function(done) {

    done = (typeof done === 'function') ? done : function() {};

    passport.use(new LocalStrategy({
        usernameField: 'username'
    }, function(username, password, done) {

        username = username.toLowerCase().replace(/^[ \t]+|[ \t]+$/ig, '');

        var LoginUserModel = require(ROOT + "/app/models").user;

        LoginUserModel
            .findOne({
                where: {
                    username: username,
                }
            })
            .then(function(err, account) {

                if (err || !account) {
                    done(err, false);
                    return;
                }

                // var isV1Password = bcrypt.compareSync(password, account.password);

                // if (isV1Password) {

                //     if (!account.firstLogin) {
                //         account.firstLogin = new Date();
                //     }

                //     account.lastLogin = new Date();

                //     account.save(done);

                //     return;

                // }

                done(true, null);

            });

    }));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: JWT_SECRET
    }, function(payload, done) {
        try {

            var User = require(ROOT + "/app/models").user;
            var user = User.findById(payload.sub);

            if (!user) {
                return done(null, false);
            }

            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }));

    passport.serializeUser(function(user, done) {

        done(null, {
            '_id': user.user_id,
            'accountType': user.user_tyoe,
        });

    });

    passport.deserializeUser(function(user, done) {

        var id = user._id;

        var UserModel = require(ROOT + "/app/models").user;

        UserModel
            .findById(id)
            .exec(done);

    });

    done();
};