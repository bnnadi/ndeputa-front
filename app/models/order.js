"use strict";

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("order", {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: DataTypes.INTEGER,
        createdby_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customer_name: DataTypes.STRING
    }, {
        tableName: 'orders',
        timestamps: true,
        updatedAt: 'updateTimestamp',
        deletedAt: 'destroyTime',
        paranoid: true
    });

    Order.associate = function(models) {};

    return Order;
};