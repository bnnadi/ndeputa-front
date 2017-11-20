var _ = require('lodash');
var async = require('async');
var fs = require('fs');

var public = require(ROOT + '/app/controllers/public_controller');

var v1Admin = require(ROOT + '/app/controllers/admin_controller');
var v1User = require(ROOT + '/app/controllers/user_controller');

module.exports = function routes() {

    this.all('/', public.index);

    this.get('/logout', v1User.logout);

    // working sites
    this.get('/admin', v1Admin.index);

    // user
    this.post('/api/v1/user/login', v1User.login);
    this.post('/api/v1/user.json', v1User.createOne);
    this.get('/api/v1/user.json', v1User.readOne);

};