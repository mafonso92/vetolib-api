'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define('Pet', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['M', 'F']
        },
        age: {
            type: DataTypes.INTEGER
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true
    });

    Pet.associate = function(models) {
        Pet.hasOne(models.Breed);
		Pet.hasMany(models.HealthBook);
        Pet.belongsTo(models.User);
    };

    return Pet;
};
