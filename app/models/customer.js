"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer_id: DataTypes.INTEGER,
        customer_name: DataTypes.STRING,
        createdBy_id: DataTypes.INTEGER
    }, {
        tableName: 'customers'
    });

    Customer.associate = function(models) {};

    return Customer;
};