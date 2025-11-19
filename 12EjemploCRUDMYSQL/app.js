/*
# Crudnode.js
Crud de prueba con conexion a Mysql para el curso nuevo de node.js de digital webdise
Pasos para ejecutar el proyecto

mkdir express-mysql-crud // ya se creo la carpeta
cd express-mysql-crud
npm init -y
npm install express mysql body-parser

-- Script para crear la tabla de estudiantes
CREATE TABLE estudiantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  edad INT NOT NULL,
  curso VARCHAR(255) NOT NULL
);

-- Script para insertar datos iniciales en la tabla de estudiantes
INSERT INTO estudiantes (nombre, edad, curso) VALUES
  ('Estudiante 1', 20, 'Curso A'),
  ('Estudiante 2', 22, 'Curso B'),
  ('Estudiante 3', 21, 'Curso C');

*/ 

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Configuración de MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'n0m3l0',
  database: 'estudiantescrud'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Servir archivos estáticos (CSS, imágenes, etc.) desde la carpeta "public"
app.use(express.static(__dirname + '/estilos'));

// Ruta principal que muestra el formulario y la lista de estudiantes
app.get('/', (req, res) => {
  const query = 'SELECT * FROM estudiantes';
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.render('index', { estudiantes: result });
  });
});

// Ruta para crear un nuevo estudiante
app.post('/estudiantes', (req, res) => {
  const { nombre, edad, curso } = req.body;
  const query = `INSERT INTO estudiantes (nombre, edad, curso) VALUES ('${nombre}', ${edad}, '${curso}')`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// Ruta para eliminar un estudiante por su ID
app.get('/estudiantes/delete/:id', (req, res) => {
  const estudianteId = req.params.id;
  const query = `DELETE FROM estudiantes WHERE id = ${estudianteId}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// Ruta para actualizar un estudiante por su ID (mostrar formulario de edición)
app.get('/estudiantes/edit/:id', (req, res) => {
  const estudianteId = req.params.id;
  const query = `SELECT * FROM estudiantes WHERE id = ${estudianteId}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.render('edit', { estudiante: result[0] });
  });
});

// Ruta para guardar la actualización de un estudiante
app.post('/estudiantes/update/:id', (req, res) => {
  const estudianteId = req.params.id;
  const { nombre, edad, curso } = req.body;
  const query = `UPDATE estudiantes SET nombre = '${nombre}', edad = ${edad}, curso = '${curso}' WHERE id = ${estudianteId}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});



app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
