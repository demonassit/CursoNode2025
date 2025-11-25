const { Router } = require('express')

const cursosController = require('../controllers/cursosController.js')

const cursosRouter = Router()

cursosRouter.get('/', cursosController.getCursos)

cursosRouter.get('/:id', cursosController.detailsCurso)

cursosRouter.post('/', cursosController.add)
cursosRouter.post('/registrar-estudiante', cursosController.asociarStudiante)

cursosRouter.put('/:id', cursosController.update)

cursosRouter.delete('/:id', cursosController.deleteCurso)

module.exports = cursosRouter