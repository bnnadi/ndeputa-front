"use strict";

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("product", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: DataTypes.STRING,
        createdBy_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'products',
        timestamps: true,
        updatedAt: 'updateTimestamp',
        deletedAt: 'destroyTime',
        paranoid: true
    });

    Product.associate = function(models) {};

    return Product;
};