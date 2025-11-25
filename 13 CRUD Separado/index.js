const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config()

const studentRouter = require('./routes/studentsRoutes.js')
const teacherRouter = require('./routes/teachersRoutes.js')
const cursosRouter = require('./routes/cursosRoutes.js')

const app = express()

const db = require('./database/config.js')
// View engine (EJS)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// midd
app.use(express.json())
app.use(cors())

// Serve static views
app.use(express.static(path.join(__dirname, 'views')))

// Route to main cursos view
app.get('/vista/cursos', (req, res) => {
        // Redirect server-side to the EJS view route
        res.redirect('/vista/cursos-ejs')
})

// Root route: servir la página de bienvenida para que abrir http://localhost:PORT muestre la bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'))
})

// Route that renders the EJS cursos page
app.get('/vista/cursos-ejs', (req, res) => {
    // Render the EJS template with cursos loaded from DB (server-side)
    db.query('SELECT * FROM cursos', (err, rows) => {
        if (err) {
            // Log error and render page with empty list
            console.error('Error al obtener cursos para la vista EJS:', err)
            return res.render('cursos', { cursos: [] })
        }

        return res.render('cursos', { cursos: rows })
    })
})

// Routes
app.use('/estudiantes', studentRouter)
app.use('/profesores', teacherRouter)
app.use('/cursos', cursosRouter)

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    const used = server.address().port
    console.log(`Applicacion corriendo en el puerto ${used}`)
})

