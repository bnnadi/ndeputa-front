"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        order_id: DataTypes.INTEGER,
        customer_id: DataTypes.INTEGER,
        createdby_id: DataTypes.INTEGER,
        customer_name: DataTypes.STRING
    }, {
        tableName: 'orders'
    });

    Order.associate = function(models) {};

    return Order;
};