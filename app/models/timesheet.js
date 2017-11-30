"use strict";

module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.models.company;
    var User = sequelize.models.user;

    var Timesheet = sequelize.define("timesheet", {
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            field: 'company_id',
            allowNull: false
        },
        timeIn: {
            type: DataTypes.DATE,
        },
        timeOut: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        tableName: 'timesheets',
        timestamps: true,
        paranoid: true
    });

    Timesheet.associate = function(models) {
        Timesheet.hasOne(models.company);
        Timesheet.hasOne(models.user);
    };

    return Timesheet;
};