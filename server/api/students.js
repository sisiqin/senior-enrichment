const express = require('express');
const router = express.Router();
const Student = require('../db/models/student')

module.exports = router;

router.get('/', (req, res, next) => {
	Student.findAll()
	.then(students => res.json(students))
	.catch(next)
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Student.findById(id)
    .then(student => res.json(student))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Student.create(req.body) // req.body should take name & email
    .then(student => res.status(201).json(student))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    const newCampusId = req.body.campusId;
    const studentId = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    Student.findById(studentId)
    .then(student => {
        student.campusId = newCampusId;
        student.name = newName || student.name;
        student.email = newEmail || student.email;
        student.save({fileds:['campusId', 'name', 'email']}) 
    .then(() => {
        return Student.findById(studentId)
        .then(student => {
        res.status(201).json(student)})   
        })   
    })   
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Student.findById(req.params.id)
    .then(student => student.destroy()
    .then( () => {
        return Student.findAll()
    .then(students => {
        res.json(students)})
    })
    )
    .catch(next)
})