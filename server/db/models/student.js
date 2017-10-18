const Sequelize = require('sequelize');
const db = require('../index');



module.exports = db.define('student', {
    name:  {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    email : Sequelize.STRING,

})