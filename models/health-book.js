'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const HealthBook = sequelize.define('HealthBook', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        action: {
            type: DataTypes.STRING
        },
		commentary: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
    });

    HealthBook.associate = function(models) {
        HealthBook.hasOne(models.Vet);
        HealthBook.belongsTo(models.Pet);
    };

    return HealthBook;
};
