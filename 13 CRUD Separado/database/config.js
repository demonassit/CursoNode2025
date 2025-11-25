const mysql2 = require('mysql2')

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'cursos'
})

db.connect((error) => {
    if (error) {
        console.error('Error en la conexion:', error && error.message ? error.message : error)
        // Salir con código 1 para indicar fallo en la conexión
        process.exit(1)
    }

    console.log('Base de datos conectada')
})

module.exports = db