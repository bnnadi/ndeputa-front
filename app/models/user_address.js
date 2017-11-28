"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserAddress = sequelize.define("user_address", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING,
            defaultValue: null
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
        tableName: 'users_addresses',
        timestamps: true,
        paranoid: true
    });

    UserAddress.associate = function(models) {};

    var User = sequelize.models.User;
    UserAddress.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

    return UserAddress;
};