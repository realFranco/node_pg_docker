/**
 * Dev: f97gp1@gmail.com
 * Date: June 5th, 2020
 * 
 * Model for the table "car".
 */

const Sequelize = require('sequelize');
const db = require('../config/database');

const car = db.define('car', {
    id_car : {
        type        : Sequelize.UUIDV4,
        primaryKey  : true
    },

    brand : {
        type        : Sequelize.STRING,
        allowNull   : false
    },

    model : {
        type        : Sequelize.STRING,
        allowNull   : false,
        unique      : true
    }
}, {
    timestamps: false,
    freezeTableName: true, // Model tableName will be the same as the model name
    underscored: true
});

module.exports = car;
