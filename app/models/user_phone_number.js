"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserPhoneNumber = sequelize.define("user_phone_number", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'users_phone_numbers',
        timestamps: true,
        paranoid: true
    });

    UserPhoneNumber.associate = function(models) {};

    return UserPhoneNumber;
};