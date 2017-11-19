"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        user_type: DataTypes.STRING,
        lastlogin: DataTypes.DATE,
        createdBy_id: DataTypes.INTEGER,
        created_date: DataTypes.DATE,
        modified_date: DataTypes.DATE
    }, {
        tableName: 'users'
    });

    User.associate = function(models) {};

    return User;
};