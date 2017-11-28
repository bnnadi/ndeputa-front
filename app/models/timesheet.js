"use strict";

module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.models.company;
    var User = sequelize.models.user;

    var Timesheet = sequelize.define("timesheet", {
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
        companyId: {
            type: DataTypes.INTEGER,
            field: 'company_id',
            allowNull: false,
            references: {
                model: Company,
                key: 'id',
            }
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

    Timesheet.associate = function(models) {};

    return Timesheet;
};