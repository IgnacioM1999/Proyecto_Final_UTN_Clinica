const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Conexion a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 

})

//creacion de un insumo
app.post('/insumos', (req, res) => {
  const { nombre, descripcion, cantidad } = req.body;

  if ( !nombre || !cantidad || !descripcion) {
    return res.status(400).json({ error: 'nombre, descripcion y cantidad son obligatorios' });
  }

  const query = 'INSERT INTO insumos (nombre, descripcion, cantidad) VALUES ( ?, ?, ?)';
  db.query(query, [nombre, descripcion, cantidad], (err, result) => {
    if (err) {
      console.error('Error al insertar insumo:', err);
      return res.status(500).json({ error: 'Error al insertar insumo' });
    }
    res.json({ message: 'Insumo creado'});
  });
});

//modificacion de un insumo
app.put('/insumos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, cantidad } = req.body;

  const query = 'UPDATE insumos SET nombre = ?, descripcion = ?, cantidad = ? WHERE idInsumos = ?';
  db.query(query, [nombre, descripcion, cantidad, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar insumo:', err);
      return res.status(500).json({ error: 'Error al actualizar insumo' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json({ message: 'Insumo actualizado correctamente' });
  });
});

//eliminacion de un insumo
app.delete('/insumos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM insumos WHERE idInsumos = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar insumo:', err);
      return res.status(500).json({ error: 'Error al eliminar insumo' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json({ message: 'Insumo eliminado correctamente' });
  });
});

//listado de insumos
app.get('/insumos', (req, res) => {
  const query = 'SELECT * FROM insumos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener insumos:', err);
      return res.status(500).json({ error: 'Error al obtener insumos' });
    }
    res.json(results);
  });
});