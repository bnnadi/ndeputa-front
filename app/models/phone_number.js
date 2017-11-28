"use strict";

module.exports = function(sequelize, DataTypes) {
    var PhoneNumber = sequelize.define("phone_number", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        type: {
            type: DataTypes.ENUM,
            values: ['customer', 'employye']
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
        tableName: 'phone_numbers',
        timestamps: true,
        paranoid: true
    });

    PhoneNumber.associate = function(models) {};

    var User = sequelize.models.User;
    PhoneNumber.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

    // PhoneNumber.beforeSave(function(instance, options) {});

    return PhoneNumber;
};