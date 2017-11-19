"use strict";

module.exports = function(sequelize, DataTypes) {
    var ProductOrder = sequelize.define("ProductOrder", {
        products_orders_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        order_id: DataTypes.INTEGER,
        product_qty: DataTypes.STRING,
        createdBy_id: DataTypes.INTEGER
    }, {
        tableName: 'products_orders'
    });

    ProductOrder.associate = function(models) {};

    return ProductOrder;
};