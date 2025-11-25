const dbConnection = require('../database/config.js')

const getCursos = (req, res) => {
  try {
    dbConnection.query('SELECT * FROM cursos', (err, rows) => {
      if (err) return res.status(400).json({ msg: err })
      return res.status(200).json(rows)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const detailsCurso = (req, res) => {
  try {
    const { id } = req.params
    dbConnection.query('SELECT * FROM cursos WHERE id = ?', [id], (err, rows) => {
      if (err) return res.status(400).json({ msg: err })
      return res.status(200).json(rows[0])
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const add = (req, res) => {
  try {
    const { nombre, descripcion, profesor_id } = req.body
    dbConnection.query(
      'INSERT INTO cursos (id, nombre, descripcion, profesor_id ) VALUES (NULL, ?, ?, ?)',
      [nombre, descripcion, profesor_id],
      (error, rows) => {
        if (error) return res.status(400).send(error)
        return res.status(201).json({ id: rows.insertId })
      }
    )
  } catch (error) {
    res.status(500).send(error)
  }
}

const update = (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion, profesor_id } = req.body
    dbConnection.query(
      'UPDATE cursos SET nombre = ?, descripcion = ?, profesor_id  = ? WHERE id = ?;',
      [nombre, descripcion, profesor_id, id],
      (error, rows) => {
        if (error) return res.status(400).send(error)
        if (rows.affectedRows === 1) return res.status(200).json({ msg: 'Registro actualizado con exito' })
        return res.status(404).json({ msg: 'Registro no encontrado' })
      }
    )
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteCurso = (req, res) => {
  try {
    const { id } = req.params
    dbConnection.query('DELETE FROM cursos WHERE id = ?;', [id], (error, rows) => {
      if (error) return res.status(400).send(error)
      if (rows.affectedRows === 1) return res.status(200).json({ msg: 'Registro eliminado con exito' })
      return res.status(404).json({ msg: 'Registro no encontrado' })
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const asociarStudiante = (req, res) => {
  try {
    const { curso_id, estudiante_id } = req.body
    dbConnection.query(
      'INSERT INTO curso_estudiantes (curso_id , estudiante_id ) VALUES (?, ?)',
      [curso_id, estudiante_id],
      (error, rows) => {
        if (error) return res.status(400).send(error)
        return res.status(201).json({ msg: 'Estudiante registrado con exito' })
      }
    )
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getCursos,
  detailsCurso,
  add,
  update,
  deleteCurso,
  asociarStudiante,
}
