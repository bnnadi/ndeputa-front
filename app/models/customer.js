"use strict";

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        customerName: {
            type: DataTypes.STRING,
            field: 'customer_name'
        },
        email: {
            type: DataTypes.STRING,
            vaildate: {
                notNull: true,
                isEmail: true
            }
        },
        companyName: {
            type: DataTypes.STRING,
            field: 'company_name'
        },
        createdById: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'createdBy_id'
        }
    }, {
        tableName: 'customers',
        timestamps: true,
        paranoid: true
    });

    Customer.associate = function(models) {};

    var Address = sequelize.models.address;
    var Phone = sequelize.models.phone_number;
    Customer.Address = Customer.hasMany(Address, { foreignKey: 'userId', sourceKey: 'id' });
    Customer.Phone = Customer.hasMany(Phone, { foreignKey: 'userId', sourceKey: 'id' });

    return Customer;
};