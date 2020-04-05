'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Vet = sequelize.define('Vet', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
		nbOrdinal: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        civility: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['M', 'MME']
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use !'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        /*isValid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isLock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },*/
        speciality: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['NONE', 'SIMPLE', 'RESIDENT']
        }
    }, {
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        hooks: {
            beforeValidate: (user) => {
                if (!user.username) {
                    user.username = user.email;
                }
            },
            beforeCreate: (user) => {
                // HASH PASSWORD
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            },
            /*beforeUpdate: (user) => {
                if (user.loginProvider === 'LOCAL') {
                    user.username = user.email;
                }
            }*/
        }
    });

    Vet.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Vet.associate = function(models) {
        Vet.belongsTo(models.Clinical);
		Vet.belongsTo(models.HealthBook);
    };

    return Vet;
};
