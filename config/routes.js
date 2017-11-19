var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var v1User = require(ROOT + '/app/controllers/user_controller');

module.exports = function routes() {

    // user
    this.post('/api/v1/user/login', v1User.login);
    this.get('/api/v1/user/logout', v1User.logout);
    this.post('/api/v1/user.json', v1User.createOne);
    this.get('/api/v1/user.json', v1User.readOne);

};