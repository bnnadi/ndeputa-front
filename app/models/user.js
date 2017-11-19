"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_type: {
            type: DataTypes.STRING
        },
        lastlogin: {
            type: DataTypes.DATE
        },
        createdBy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'users',
        timestamps: true,
        updatedAt: 'updateTimestamp',
        deletedAt: 'destroyTime',
        paranoid: true
    });

    User.associate = function(models) {};

    return User;
};