const dbConnection = require('../database/config.js')

const getStudents = (req, res) => {
  try {
    dbConnection.query('SELECT * FROM estudiantes', (err, rows) => {
      if (err) return res.status(400).json({ msg: err })
      return res.status(200).json(rows)
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const getDetailsStudent = (req, res) => {
  try {
    const { id } = req.params
    dbConnection.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, rows) => {
      if (err) return res.status(400).json({ msg: err })
      return res.status(200).json(rows[0])
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const addStudent = (req, res) => {
  try {
    const { dni, nombre, apellido, email } = req.body
    dbConnection.query(
      'INSERT INTO estudiantes (id, dni, nombre, apellido, email) VALUES (NULL, ?, ?, ?, ?)',
      [dni, nombre, apellido, email],
      (error, rows) => {
        if (error) return res.status(400).send(error)
        return res.status(201).json({ id: rows.insertId })
      }
    )
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateStudent = (req, res) => {
  try {
    const { id } = req.params
    const { dni, nombre, apellido, email } = req.body
    dbConnection.query(
      'UPDATE estudiantes SET  dni = ?, nombre = ?, apellido = ?, email = ? WHERE id = ?;',
      [dni, nombre, apellido, email, id],
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

const deleteStudent = (req, res) => {
  try {
    const { id } = req.params
    dbConnection.query('DELETE FROM estudiantes WHERE id = ?;', [id], (error, rows) => {
      if (error) return res.status(400).send(error)
      if (rows.affectedRows === 1) return res.status(200).json({ msg: 'Registro eliminado con exito' })
      return res.status(404).json({ msg: 'Registro no encontrado' })
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getStudents,
  getDetailsStudent,
  addStudent,
  updateStudent,
  deleteStudent,
}
