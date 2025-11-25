const dbConnection = require('../database/config.js')

const getTeachers = (req, res) => {
  try {
    dbConnection.query('SELECT * FROM profesores', (err, rows) => {
      if (err) return res.status(400).json({ msg: err })
      return res.status(200).json(rows)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const getDetailsTeacher = (req, res) => {
  try {
    const { id } = req.params
    dbConnection.query('SELECT * FROM profesores WHERE id = ?', [id], (err, rows) => {
      if (err) return res.status(400).json({ msg: err })
      return res.status(200).json(rows[0])
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const addTeacher = (req, res) => {
  try {
    const { dni, nombre, apellido, email, profesion, telefono } = req.body
    dbConnection.query(
      'INSERT INTO profesores (id, dni, nombre, apellido, email, profesion, telefono) VALUES (NULL, ?, ?, ?, ?, ?, ?)',
      [dni, nombre, apellido, email, profesion, telefono],
      (error, rows) => {
        if (error) return res.status(400).send(error)
        return res.status(201).json({ id: rows.insertId })
      }
    )
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateTeacher = (req, res) => {
  try {
    const { id } = req.params
    const { dni, nombre, apellido, email, profesion, telefono } = req.body
    dbConnection.query(
      'UPDATE profesores SET  dni = ?, nombre = ?, apellido = ?, email = ?, profesion = ?, telefono = ? WHERE id = ?;',
      [dni, nombre, apellido, email, profesion, telefono, id],
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

const deleteTeacher = (req, res) => {
  try {
    const { id } = req.params
    dbConnection.query('DELETE FROM profesores WHERE id = ?;', [id], (error, rows) => {
      if (error) return res.status(400).send(error)
      if (rows.affectedRows === 1) return res.status(200).json({ msg: 'Registro eliminado con exito' })
      return res.status(404).json({ msg: 'Registro no encontrado' })
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getTeachers,
  getDetailsTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
}
