const { Router } = require('express')

const teacherController = require('../controllers/teacherController.js')

const teacherRouter = Router()

teacherRouter.get('/', teacherController.getTeachers)

teacherRouter.get('/:id', teacherController.getDetailsTeacher)

teacherRouter.post('/', teacherController.addTeacher)

teacherRouter.put('/:id', teacherController.updateTeacher)

teacherRouter.delete('/:id', teacherController.deleteTeacher)

module.exports = teacherRouter