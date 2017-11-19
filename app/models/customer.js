"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_name: DataTypes.STRING,
        createdBy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'customers',
        timestamps: true,
        updatedAt: 'updateTimestamp',
        deletedAt: 'destroyTime',
        paranoid: true
    });

    Customer.associate = function(models) {};

    return Customer;
};