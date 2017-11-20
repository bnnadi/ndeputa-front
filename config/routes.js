var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var public = require(ROOT + '/app/controllers/public_controller');

var v1Admin = require(ROOT + '/app/controllers/admin_controller');
var v1PasswordReset = require(ROOT + '/app/controllers/password_reset_controller');
var v1User = require(ROOT + '/app/controllers/user_controller');

module.exports = function routes() {

    this.all('/', public.index);

    this.get('/forgot-password', v1PasswordReset.index);
    // this.get('/password-verify', v1PasswordReset.verify);

    this.get('/logout', v1User.logout);

    // working sites
    this.get('/admin', v1Admin.index);

    // password reset
    this.post('/api/v1/passwordReset.json', v1PasswordReset.start);
    this.put('/api/v1/passwordVerify.json', v1PasswordReset.verify);

    // user
    this.post('/api/v1/user/login.json', v1User.login);
    this.post('/api/v1/user.json', v1User.createOne);
    this.get('/api/v1/user.json', v1User.readOne);

};