"use strict";
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
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
        email: {
            type: DataTypes.STRING,
            vaildate: {
                notNull: true,
                isEmail: true
            }
        },
        accountType: {
            type: DataTypes.ENUM,
            values: ['admin', 'agent', 'guard', 'pmanager', 'smanager', 'worker']
        },
        lastloginAt: {
            type: DataTypes.DATE,
            vaildate: {
                isDate: true
            }
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
        indexes: [{
            unique: true,
            fields: ['email']
        }],
        getterMethods: {
            fullName() {
                return this.first_name + ' ' + this.last_name;
            }
        },
        validate: {
            isValidPassword(password) {
                return bcrypt.compareSync(password, this.password);
            }
        }
    });

    User.associate = function(models) {};

    return User;
};