"use strict";

module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("product", {
        product_name: DataTypes.STRING,
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    });

    Product.associate = function(models) {};

    return Product;
};