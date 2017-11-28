"use strict";

module.exports = function(sequelize, DataTypes) {
    var CustomerPhoneNumber = sequelize.define("customer_phone_number", {
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'customer_id'
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'customers_phone_numbers',
        timestamps: true,
        paranoid: true
    });

    CustomerPhoneNumber.associate = function(models) {};

    var Customer = sequelize.models.customer;
    CustomerPhoneNumber.belongsTo(Customer, { foreignKey: 'customerId', targetKey: 'id' });

    return CustomerPhoneNumber;
};