"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer_id: DataTypes.INTEGER,
        customer_name: DataTypes.STRING
    }, {
        tableName: 'customers'
    });

    Customer.associate = function(models) {};

    return Customer;
};