"use strict";

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        product_id: DataTypes.INTEGER,
        product_name: DataTypes.STRING,
        createdBy_id: DataTypes.INTEGER
    }, {
        tableName: 'products'
    });

    Product.associate = function(models) {};

    return Product;
};