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
        isPrimray: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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

    var User = sequelize.models.User;
    UserPhoneNumber.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

    // UserPhoneNumber.beforeSave(function(instance, options) {});

    return UserPhoneNumber;
};