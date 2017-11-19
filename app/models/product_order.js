"use strict";

module.exports = function(sequelize, DataTypes) {
    var ProductOrder = sequelize.define("productOrder", {
        products_orders_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: DataTypes.INTEGER,
        order_id: DataTypes.INTEGER,
        product_qty: DataTypes.STRING,
        createdBy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'products_orders',
        timestamps: true,
        updatedAt: 'updateTimestamp',
        deletedAt: 'destroyTime',
        paranoid: true
    });

    ProductOrder.associate = function(models) {};

    return ProductOrder;
};