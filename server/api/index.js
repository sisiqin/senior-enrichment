'use strict'
const api = require('express').Router()
const {Campus} = require('../db/models')

//routes
api.use('/students', require('./students'))
api.use('/campuses', require('./campuses'))

//endware
api.use(function (req, res) {
	res.status(404).end();
});
  
//export api
module.exports = api