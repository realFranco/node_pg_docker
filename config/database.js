/**
 * Sequelize connection will be declared here.
 * 
 * Creating an Sequelize instance.
 */

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const Sequelize = require('sequelize');


var myEnv = dotenv.config();
dotenvExpand(myEnv);

// Connect usign a uri
module.exports = new Sequelize(
    process.env.DB_CONN, {
        pool:{
            min: 0,
            max: 32,
            acquire: 90000,
            idle: 10000
        },
        quoteIdentifiers:false
    });
