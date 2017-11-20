"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        customer_name: DataTypes.STRING,
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'customers',
        timestamps: true,
        paranoid: true
    });

    Customer.associate = function(models) {};

    return Customer;
};