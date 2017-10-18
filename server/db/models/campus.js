const Sequelize = require('sequelize');
const db = require('../../db');

module.exports = db.define('campus', {
    name:  {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }
})