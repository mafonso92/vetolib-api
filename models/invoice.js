'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('Invoice', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['Subscribe', '']
        },
        date: {
            type: DataTypes.DATE
        },
        price: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['NONE', 'SIMPLE', 'RESIDENT']
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
    });

    Invoice.associate = function(models) {
        Invoice.belongsTo(models.Clinical);
    };

    return Invoice;
};
