'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        civility: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['M', 'MME']
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE
        },
        address: {
            type: DataTypes.STRING
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
        subscription: {
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

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.associate = function(models) {
        User.hasOne(models.Pet);
    };

    return User;
};
