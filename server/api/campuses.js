const express = require('express');
const router = express.Router();
const Campus = require('../db/models/campus')
const Student = require('../db/models/student')

module.exports = router;

router.get('/', (req, res, next) => {
	Campus.findAll()
	.then(campuses => res.json(campuses))
	.catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Campus.findById(id)
    .then(campus => res.json(campus))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Campus.create(req.body) // req.body should take name
    .then(campus => res.status(201).json(campus))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    const newName = req.body.name;
    const campusId = req.params.id;
    Campus.findById(campusId)
    .then(campus => {
        campus.name = newName;
        campus.save({fileds : ["name"]})
    .then( () => {
            return Campus.findById(campusId)
            .then(campus => {
                res.status(201).json(campus)})
        })
    })
    .catch(next)
})



router.delete('/:id', (req, res, next) => {
    Student.update(
        {campusId: 1},
        { fields: ['campusId'],
        where: {campusId : req.params.id}})
    .then( () => {
        return Campus.findById(req.params.id)
        .then(campus => campus.destroy()
        .then( () => {
            return Campus.findAll()
            .then(campuses => {
            res.json(campuses)})
        })
        )
    })
    .catch(next)
})