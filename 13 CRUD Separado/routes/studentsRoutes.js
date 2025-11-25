const { Router } = require('express')

const studentsController = require('../controllers/studentController.js')

const studentRouter = Router()

studentRouter.get('/', studentsController.getStudents)

studentRouter.get('/:id', studentsController.getDetailsStudent)

studentRouter.post('/', studentsController.addStudent)

studentRouter.put('/:id', studentsController.updateStudent)

studentRouter.delete('/:id', studentsController.deleteStudent)

module.exports = studentRouter