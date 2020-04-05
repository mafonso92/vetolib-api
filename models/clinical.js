'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Clinical = sequelize.define('Clinical', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });

    Clinical.associate = function(models) {
        Clinical.hasMany(models.Vet);
		Clinical.hasMany(models.Invoice);
    };

    return Clinical;
};
