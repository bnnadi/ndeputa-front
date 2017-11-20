"use strict";
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
            type: DataTypes.STRING(30),
            set(val) {
                if (val.legnth < 8) {
                    this.setDataValue(null);
                }
                this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync()));
            },
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
        timestamps: true,
        paranoid: true,
        instanceMethods: {
            isValidPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
            fullName: function() {
                return [this.first_name, this.last_name].join(' ');
            }
        }
    });

    User.associate = function(models) {};

    return User;
};