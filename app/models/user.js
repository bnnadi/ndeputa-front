"use strict";
var _ = require("lodash");
var bcrypt = require('bcryptjs');

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
            type: DataTypes.STRING(255),
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
        instanceMethods: {
            toJSON: function() {
                var values = Object.assign({}, this.get());
                delete values.password;
                return values;
            }
        }
    });

    User.associate = function(models) {};

    User.beforeValidate(function(user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    });

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