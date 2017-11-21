"use strict";
var _ = require("lodash");
var bcrypt = require('bcryptjs');

function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                return resolve(hash);
            });
        });
    });
};

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        accountType: {
            type: DataTypes.ENUM,
            values: ['admin', 'agent', 'guard', 'pmanager', 'smanager', 'worker']
        },
        email: {
            type: DataTypes.STRING,
            vaildate: {
                notNull: true,
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        password: {
            type: DataTypes.STRING(30),
            vaildate: {
                notNull: true
            }
        },
        lastloginAt: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'users',
        paranoid: true,
        classMethods: {

        }
    });

    User.associate = function(models) {};

    // TODO: need to take a look at password cyrtograpthy
    // User.beforeValidate(function(user, options) {
    //     this.setDataValue(bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
    // });

    User.prototype.isValidPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.prototype.getfullName = function() {
        return [this.firstName, this.lastName].join(' ');
    };

    User.prototype.isManager = function() {
        return (_.includes(['admin', 'pmanager', 'smanager'], this.accountType));
    };

    return User;
};