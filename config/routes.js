var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var auth = require(ROOT + '/app/controllers/auth_controller');

module.exports = function routes() {

    // login
    this.get('/login', auth.login);

    // user
    this.get('/api/v1/user/logout', v1User.logout);
    this.get('/api/v1/user.json', v1User.readOne);

};