"use strict";

module.exports = function(sequelize, DataTypes) {
    var CustomerAddress = sequelize.define("customer_address", {
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'customer_id'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'customers_addresses',
        timestamps: true,
        paranoid: true
    });

    CustomerAddress.associate = function(models) {};

    var Customer = sequelize.models.customer;
    CustomerAddress.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'id' });

    return CustomerAddress;
};