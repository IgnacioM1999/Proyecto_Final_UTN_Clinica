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

  if (!nombre || !cantidad || !descripcion) {
    return res.status(400).json({ error: 'nombre, descripcion y cantidad son obligatorios' });
  }

  const query = 'INSERT INTO insumos (nombre, descripcion, cantidad) VALUES ( ?, ?, ?)';
  db.query(query, [nombre, descripcion, cantidad], (err, result) => {
    if (err) {
      console.error('Error al insertar insumo:', err);
      return res.status(500).json({ error: 'Error al insertar insumo' });
    }
    res.json({ message: 'Insumo creado' });
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

//creacion de turnos
app.post('/turnos', (req, res) => {
  const { fecha, horario, estado, dniEspecialista } = req.body;

  if (!fecha || !horario || !estado || !dniEspecialista) {
    return res.status(400).json({ error: 'Completar todos los campos' });
  }

  const query = 'INSERT INTO turnos (fecha, horario, estado, dniEspecialista) VALUES ( ?, ?, ?, ?)';
  db.query(query, [fecha, horario, estado, dniEspecialista], (err, result) => {
    if (err) {
      console.error('Error al insertar turno:', err);
      return res.status(500).json({ error: 'Error al insertar insumo' });
    }
    res.json({ message: 'Insumo creado' });
  });
});

//listado de turnos
app.get('/turnos', (req, res) => {
  const query = 'SELECT * FROM turnos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener turnos:', err);
      return res.status(500).json({ error: 'Error al obtener turnos' });
    }
    res.json(results);
  });
});

//modificar turnos
app.put('/turnos/:id', (req, res) => {
  const { id } = req.params;
  const { fecha, horario, estado, dniEspecialista } = req.body;

  const query = 'UPDATE turnos SET fecha = ?, horario = ?, estado = ?, dniEspecialista = ? WHERE idTurno = ?';
  db.query(query, [fecha, horario, estado, dniEspecialista, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar turno:', err);
      return res.status(500).json({ error: 'Error al actualizar turno' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'turno no encontrado' });
    }
    res.json({ message: 'turno actualizado correctamente' });
  });
});

//eliminar turnos
app.delete('/turnos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM turnos WHERE idTurno = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar turno:', err);
      return res.status(500).json({ error: 'Error al eliminar turno' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }
    res.json({ message: 'Turno eliminado correctamente' });
  });
});

//Obtener usuarios del tipo especialista
app.get('/especialistas', (req, res) => {
  const query = `
    SELECT dniUsuario AS dniEspecialista, nombreYApellido, telefono, mail, nombreUsuario
    FROM usuarios
    WHERE tipoUsuario = 'especialista'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener especialistas:', err);
      return res.status(500).json({ error: 'Error al obtener especialistas' });
    }
    res.json(results);
  });
});

// Obtener todos los especialistas (usuarios con tipoUsuario = 'especialista')
app.get('/usuarios/especialistas', (req, res) => {
  const query =`
    SELECT * 
    FROM usuarios 
    WHERE tipoUsuario = 'especialista'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo especialistas:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

//Obtener los datos de los pacientes y especialistas
app.get('/turnos/especialistas-y-pacientes', (req, res) => {
  const query =`
    SELECT t.idTurno,
      t.fecha,
      t.horario,
      t.estado,
      e.dniUsuario AS dniEspecialista,
      e.nombreYApellido AS nombreEspecialista,
      p.dniUsuario AS dniPaciente,
      p.nombreYApellido AS nombrePaciente
    FROM turnos t
    JOIN usuarios e ON t.dniEspecialista = e.dniUsuario
    JOIN usuarios p ON t.dniPaciente = p.dniUsuario
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo los especialistas y pacientes de cada turno:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});
