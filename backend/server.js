const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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
  const { nombre, descripcion, cantidad, consumible } = req.body;
  const estado = 'activo';

  if (!nombre || !cantidad || !descripcion) {
    return res.status(400).json({ error: 'nombre, descripcion y cantidad son obligatorios' });
  }

  const query = 'INSERT INTO insumos (nombre, descripcion, cantidad, estado, consumible) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, cantidad, estado, consumible], (err, result) => {
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

//eliminacion de un insumo (se hace la baja logica, editando el campo estado de 'activo' a 'inactivo')
//No se cambia el delete por el update porque habria que cambiar todo el frontend
app.delete('/insumos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE insumos SET estado = "inactivo" WHERE idInsumos = ?';
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
  const query = `SELECT * FROM insumos WHERE estado ="activo" `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener insumos:', err);
      return res.status(500).json({ error: 'Error al obtener insumos' });
    }
    res.json(results);
  });
});

//Listar insumos que son descartables
//Esta llamada se invoca en el paso de Registrar Puntos en la opcion Registrar Sesion de un Especialista
app.get('/insumos/descartables', (req, res) => {
  const sql = "SELECT * FROM insumos WHERE consumible= 'si'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener insumos:', err);
      res.status(500).json({ error: 'Error al obtener insumos' });
    } else {
      res.json(results);
    }
  });
});

//Actualizar la cantidad de los insumos que se han utilizado en una sesion
//Esta llamada se invoca en el paso de Registrar Puntos en la opcion Registrar Sesion del menu del Especialista
app.post('/insumos/restarInsumosUsados', (req, res) => {
  const insumos = req.body; // [{ idInsumo: 1, cantidadUsada: 3 }, ...]

  if (!Array.isArray(insumos) || insumos.length === 0) {
    return res.status(400).json({ message: 'Lista de insumos vacía o inválida' });
  }

  const promises = insumos.map(insumo => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE insumos
        SET cantidad = cantidad - ?
        WHERE idInsumos = ?;
      `;
      db.query(query, [insumo.cantidadUsada, insumo.idInsumo], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  });

  Promise.all(promises)
    .then(() => res.json({ message: 'Cantidades de insumos actualizadas correctamente' }))
    .catch(err => {
      console.error('Error al restar insumos:', err);
      res.status(500).json({ message: 'Error al restar insumos', error: err });
    });
});

//TURNOS
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
  const query = `
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
    LEFT JOIN usuarios p ON t.dniPaciente = p.dniUsuario
  `;
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

//Listar turnos del especialista que hayan sido solicitados por un paciente
app.get('/turnos/:dniEspecialista', (req, res) => {
  const { dniEspecialista } = req.params
  //console.log('DNI recibido en backend:', dniEspecialista);
  const query = `
    SELECT t.idTurno, t.fecha, t.horario, t.estado, 
    t.dniEspecialista AS dniEspecialista, e.nombreYApellido AS nombreEspecialista,
    t.dniPaciente AS dniPaciente, p.nombreYApellido AS nombrePaciente
    FROM turnos t
    INNER JOIN usuarios p ON t.dniPaciente = p.dniUsuario
    INNER JOIN usuarios e ON t.dniEspecialista = e.dniUsuario
    WHERE t.estado = 'Ocupado' and dniPaciente is not null and dniEspecialista = ?
    ORDER BY t.fecha, t.horario;
  `;

  db.query(query, [dniEspecialista], (err, result) => {
    if (err) {
      console.error('Error al obtener turnos:', err);
      res.status(500).send('Error al obtener turnos');
    } else {
      res.json(result);
    }
  });
});

//Actualizar el estado del turno a CONCLUIDO.
//Esta consulta se usa cuando se registra una Sesion en el proceso Registrar Sesion en el menu del Especialista.
app.put('/turnos/:idTurno/estado', (req, res) => {
  const { idTurno } = req.params;
  const { nuevoEstado } = req.body; // Espera algo como { nuevoEstado: 'Concluido' }

  const query = 'UPDATE turnos SET estado = ? WHERE idTurno = ?';
  db.query(query, [nuevoEstado, idTurno], (err, result) => {
    if (err) {
      console.error('Error al actualizar estado del turno:', err);
      return res.status(500).json({ error: 'Error al actualizar el turno' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.json({ message: 'Estado del turno actualizado correctamente' });
  });
});

//Listado de turnos con estado disponible.
//Este metodo se usa en la opcion Agentar Turno del menu del Paciente
app.get('/turnosDisponibles', (req, res) => {
  const query = `
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
    LEFT JOIN usuarios p ON t.dniPaciente = p.dniUsuario
    WHERE t.estado = 'Disponible' and t.dniPaciente is null
  `;
  console.log('Entra la peticion de turnos/disponibles')
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener turnos:', err);
      return res.status(500).json({ error: 'Error al obtener turnos' });
    }
    res.json(results);
  });
});

//Actualiza el turno con el estado = 'Ocupado' y asignandole el dniPaciente que lo selecciono
//Este metodo se usa en la opcion Agendar Turno del menu del Paciente
app.put('/turnos/:idTurno/estadoOcupado', (req, res) => {
  const { idTurno } = req.params;
  const { nuevoEstado, dniPaciente } = req.body; // ahora recibe también dniPaciente

  const query = 'UPDATE turnos SET estado = ?, dniPaciente = ? WHERE idTurno = ?';
  db.query(query, [nuevoEstado, dniPaciente, idTurno], (err, result) => {
    if (err) {
      console.error('Error al actualizar estado del turno:', err);
      return res.status(500).json({ error: 'Error al actualizar el turno' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Turno no encontrado' });
    }

    res.json({ message: 'Turno agendado correctamente' });
  });
});

//Listado de turnos con estado Ocupado que fueron reservados por el paciente usando dniUs.
//Este metodo se usa en la opcion Agentar Turno del menu del Paciente
app.get('/turnosReservadosPaciente/:dniPaciente', (req, res) => {
  const { dniPaciente } = req.params;
  const query = `
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
    LEFT JOIN usuarios p ON t.dniPaciente = p.dniUsuario
    WHERE t.estado = 'Ocupado' and t.dniPaciente = ? 
  `;
  console.log('Entra la peticion de turnosReservadosPaciente')
  db.query(query, [dniPaciente], (err, results) => {
    if (err) {
      console.error('Error al obtener turnos:', err);
      return res.status(500).json({ error: 'Error al obtener turnos' });
    }
    res.json(results);
  });
});


//USUARIO
//Obtener usuarios 
app.get('/usuarios', (req, res) => {
  const query = `
    SELECT dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, estado
    FROM usuarios 
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

//Eliminar Logicamente Usuarios (setear en el atributo estado='inactivo'). 
// Se usa para eliminar ESPECIALISTAS, PASANTES Y PACIENTES
//Se deja el delete, no se cambia a update, para no cambiar todo el frontend
app.delete('/usuarios/:dni', (req, res) => {
  const { dni } = req.params;
  //Actualizacion del atributo estado de 'activo' a 'inactivo'
  const queryUsuario = 'UPDATE usuarios SET estado = "inactivo" WHERE dniUsuario = ?';

  db.query(queryUsuario, [dni], (err, result) => {
    if (err) {
      console.error('Error al dar de baja al usuario:', err);
      return res.status(500).json({ error: 'Error al dar de baja al usuario' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario dado de baja correctamente ✅' });
  });
});

// Obtener todos los especialistas (usuarios con tipoUsuario = 'especialista')
//Se usa para la listar los nombres de los especialistas en el Crear Turno
app.get('/usuarios/especialistas', (req, res) => {
  const query = `
    SELECT * 
    FROM usuarios 
    WHERE tipoUsuario = 'especialista' and estado = 'activo'
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

//PACIENTE 
// Insertar en la tabla usuarios y pacientes el Registro de USUARIO + PACIENTE
app.post('/pacientes', (req, res) => {
  const { usuario, paciente } = req.body;
  const { dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad } = usuario;
  const { obraSocial, fechaNacimiento, sexo } = paciente;
  const estado = "activo"

  // Insertar en tabla usuarios
  const sqlUsuario = `INSERT INTO usuarios (dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlUsuario, [dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado], (err) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }

    // Insertar en tabla pacientes
    const sqlPaciente = `INSERT INTO pacientes (dniPaciente, obraSocial, fechaNacimiento, sexo) VALUES (?, ?, ?, ?)`;
    db.query(sqlPaciente, [dniUsuario, obraSocial, fechaNacimiento, sexo], (err2) => {
      if (err2) {
        console.error('Error al insertar paciente:', err2);
        return res.status(500).json({ error: 'Error al registrar paciente' });
      }
      res.json({ message: 'Paciente registrado con éxito' });
    });
  });
});

//Listar los pacientes (informacion de la tabla usuarios y especialistas)
app.get('/pacientes', (req, res) => {
  const query = `SELECT u.dniUsuario as dniPaciente, u.nombreYApellido, u.telefono, u.mail, 
                u.nombreUsuario, u.contrasenia, p.obraSocial, p.fechaNacimiento, p.sexo
                 FROM usuarios u 
                 INNER JOIN pacientes p ON p.dniPaciente = u.dniUsuario
                 WHERE u.estado = 'activo'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener pacientes:', err);
      return res.status(500).json({ error: 'Error al obtener pacientes' });
    }
    res.json(results);
  });
});

//Modificar pacientes (informacion de la tabla usuarios y pacientes)
app.put('/pacientes/:dni', (req, res) => {
  const { dni } = req.params;
  const { usuario, paciente } = req.body;

  const queryUsuarios = `
    UPDATE usuarios 
    SET nombreYApellido = ?, telefono = ?, mail = ?, nombreUsuario = ?, contrasenia = ?
    WHERE dniUsuario = ?`;

  const queryPacientes = `
    UPDATE pacientes 
    SET obraSocial = ?, fechaNacimiento = ?, sexo = ?
    WHERE dniPaciente = ?`;

  db.query(queryUsuarios, [usuario.nombreYApellido, usuario.telefono, usuario.mail, usuario.nombreUsuario,
  usuario.contrasenia, dni], (err, resultUsuarios) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }

    if (resultUsuarios.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    db.query(queryPacientes, [paciente.obraSocial, paciente.fechaNacimiento, paciente.sexo, dni],
      (err2, resultPacientes) => {
        if (err2) {
          console.error('Error al actualizar Paciente:', err2);
          return res.status(500).json({ error: 'Error al actualizar Paciente' });
        }

        res.json({
          message: 'Paciente y usuario actualizados correctamente ✅',
        });
      }
    );
  }
  );
});

//Actualizar la contraseña del usuario.
//Este metodo se usa en el componente Perfil
app.put('/usuarios/:dniUsuario/contrasenia', (req, res) => {
  const { dniUsuario } = req.params;
  const { nuevaContrasenia } = req.body;

  if (!nuevaContrasenia) {
    return res.status(400).json({ error: 'La nueva contraseña es requerida' });
  }

  const sql = 'UPDATE usuarios SET contrasenia = ? WHERE dniUsuario = ?';
  db.query(sql, [nuevaContrasenia, dniUsuario], (err, result) => {
    if (err) {
      console.error('Error al actualizar la contraseña:', err);
      return res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Contraseña actualizada correctamente' });
  });
});

//Recuperar la contraseña del usuario (mostrando la contraseña desde la pagina)
//Este endpoint se usa en el componente Password
app.get('/usuarios/:mail/:nombreUsuario', (req, res) => {
  const { mail, nombreUsuario } = req.params;
  const query = 'SELECT * FROM usuarios WHERE mail = ? AND nombreUsuario = ?';
  console.log('Se llego a la llamada');
  db.query(query, [mail, nombreUsuario], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      res.status(500).send('Error al buscar usuario');
      return;
    }

    if (results.length > 0) {
      res.json(results[0]); // Devuelve el usuario encontrado
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  });
});


//PASANTE
// insertar en la tabla usuarios y pasantes el Registro de USUARIO + PASANTE
// ==============================================================================
app.post('/pasantes', (req, res) => {
  const { usuario, pasante } = req.body;

  const { dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad } = usuario;
  const { horasPasante, institucion, mesInicio, anioInicio, docente, mailDocente, categoria } = pasante;
  const estado = "activo"

  // Insertar en tabla usuarios
  const sqlUsuario = `INSERT INTO usuarios (dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlUsuario, [dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado], (err) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }

    // Insertar en tabla pasantes
    const sqlPasante = `INSERT INTO pasantes (dniPasante, horasPasante, institucion, mesInicio, anioInicio, docente, mailDocente, categoria) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sqlPasante, [dniUsuario, horasPasante, institucion, mesInicio, anioInicio, docente, mailDocente, categoria], (err2) => {
      if (err2) {
        console.error('Error al insertar pasante:', err2);
        return res.status(500).json({ error: 'Error al registrar pasante' });
      }
      res.json({ message: 'Pasante registrado con éxito' });
    });
  });
});

//Listar los pasantes (informacion de la tabla usuarios y pasantes)
app.get('/pasantes', (req, res) => {
  const query = `SELECT u.dniUsuario as dniPasante, u.nombreYApellido, u.telefono, u.mail, 
                u.nombreUsuario, u.contrasenia, p.horasPasante, p.institucion, p.mesInicio,
                p.anioInicio, p.docente, p.mailDocente, p.categoria
                 FROM usuarios u 
                 INNER JOIN pasantes p ON p.dniPasante = u.dniUsuario
                 WHERE u.estado = 'activo'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener pasantes:', err);
      return res.status(500).json({ error: 'Error al obtener pasantes' });
    }
    res.json(results);
  });
});

//Modificar pasantes (informacion de la tabla usuarios y pasantes)
app.put('/pasantes/:dni', (req, res) => {
  const { dni } = req.params;
  const { usuario, pasante } = req.body;

  const queryUsuarios = `
    UPDATE usuarios 
    SET nombreYApellido = ?, telefono = ?, mail = ?, nombreUsuario = ?, contrasenia = ?
    WHERE dniUsuario = ?`;

  const queryPasantes = `
    UPDATE pasantes 
    SET horasPasante = ?, institucion = ?, mesInicio = ?, anioInicio = ?, docente = ?, mailDocente = ?, categoria = ?
    WHERE dniPasante = ?`;

  db.query(queryUsuarios, [usuario.nombreYApellido, usuario.telefono, usuario.mail, usuario.nombreUsuario,
  usuario.contrasenia, dni], (err, resultUsuarios) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }

    if (resultUsuarios.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    db.query(queryPasantes, [pasante.horasPasante, pasante.institucion, pasante.mesInicio, pasante.anioInicio, pasante.docente, pasante.mailDocente, pasante.categoria, dni],
      (err2, resultPasantes) => {
        if (err2) {
          console.error('Error al actualizar pasante:', err2);
          return res.status(500).json({ error: 'Error al actualizar pasante' });
        }

        res.json({
          message: 'Pasante y usuario actualizados correctamente',
        });
      }
    );
  }
  );
});

//Actualizar las horas del pasante sumandole la hora que duro la sesion
//Esta consulta se usa en el metodo de registrar-sesion en el menu del especialista
app.put('/pasantes/:dni/horasPasante', (req, res) => {
  const { dni } = req.params;
  const { horasExtra } = req.body; // número de horas a sumar

  const query = 'UPDATE pasantes SET horasPasante = horasPasante + ? WHERE dniPasante = ?';
  db.query(query, [horasExtra, dni], (err, result) => {
    if (err) {
      console.error('Error al actualizar horas del pasante:', err);
      return res.status(500).json({ error: 'Error al actualizar horas del pasante' });
    }
    res.json({ message: 'Horas actualizadas correctamente' });
  });
});

//Obtener al pasante  (informacion de la tabla usuarios y pasantes)
//Este metodo se usa en la opcion de Ver estado del menu Pasante
app.get('/pasantes/:dniPasante', (req, res) => {
  const { dniPasante } = req.params;
  const query = `SELECT u.dniUsuario as dniPasante, u.nombreYApellido, u.telefono, u.mail, 
                u.nombreUsuario, u.contrasenia, p.horasPasante, p.institucion, p.mesInicio,
                p.anioInicio, p.docente, p.mailDocente, p.categoria
                 FROM usuarios u 
                 INNER JOIN pasantes p ON p.dniPasante = u.dniUsuario
                 WHERE dniPasante = ?`;
  db.query(query, [dniPasante], (err, results) => {
    if (err) {
      console.error('Error al obtener el pasante:', err);
      return res.status(500).json({ error: 'Error al obtener al pasante' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Pasante no encontrado' });
    }
    const pasante = results[0]; // se guarda solo el objeto, no el array ya que el resultado de db.query es un array

    // Si el pasante completó las 525 horas y no está marcado como Finalizado, actualizamos su categoría
    if (pasante.horasPasante >= 525 && pasante.categoria !== 'Finalizado') {
      const updateQuery = `UPDATE pasantes SET categoria = 'Finalizado' WHERE dniPasante = ?`;
      db.query(updateQuery, [dniPasante], (updateErr) => {
        if (updateErr) {
          console.error('Error al actualizar la categoría del pasante:', updateErr);
        }
      });

      pasante.categoria = 'Finalizado';
    }

    res.json(pasante);
  });
});


//ESPECIALISTA
// insertar en la tabla usuarios y especialistas el Registro de USUARIO + ESPECIALISTA (usado en el crear especialista)
// ===================================================================================
app.post('/especialistas', (req, res) => {
  const { usuario, especialista } = req.body;
  const { dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad } = usuario;
  const { horasSupervisor, titulos } = especialista;
  const estado = "activo"

  // Insertar en tabla usuarios
  const sqlUsuario = `INSERT INTO usuarios (dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlUsuario, [dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado], (err) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }

    // Insertar en tabla especialistas
    const sqlEspecialista = `INSERT INTO especialistas (dniEspecialista, horasSupervisor, titulos) 
                        VALUES (?, ?, ?)`;

    db.query(sqlEspecialista, [dniUsuario, horasSupervisor, titulos], (err2) => {
      if (err2) {
        console.error('Error al insertar especialista:', err2);
        return res.status(500).json({ error: 'Error al registrar especialista' });
      }
      res.json({ message: 'Especialista registrado con éxito' });
    });
  });
});

//Listar los especialistas (informacion de la tabla usuarios y especialistas)
app.get('/especialistas', (req, res) => {
  const query = `SELECT u.dniUsuario as dniEspecialista, u.nombreYApellido, u.telefono, u.mail, 
                u.nombreUsuario, u.contrasenia, e.horasSupervisor, e.titulos
                 FROM usuarios u 
                 INNER JOIN especialistas e ON e.dniEspecialista = u.dniUsuario
                 WHERE u.estado = 'activo'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener especialistas:', err);
      return res.status(500).json({ error: 'Error al obtener especialistas' });
    }
    res.json(results);
  });
});

//modificar especialistas (informacion de la tabla usuarios y especialistas)
app.put('/especialistas/:dni', (req, res) => {
  const { dni } = req.params;
  const { usuario, especialista } = req.body;

  const queryUsuarios = `
    UPDATE usuarios 
    SET nombreYApellido = ?, telefono = ?, mail = ?, nombreUsuario = ?, contrasenia = ?
    WHERE dniUsuario = ?`;

  const queryEspecialistas = `
    UPDATE especialistas 
    SET horasSupervisor = ?, titulos = ?
    WHERE dniEspecialista = ?`;

  db.query(queryUsuarios, [usuario.nombreYApellido, usuario.telefono, usuario.mail, usuario.nombreUsuario,
  usuario.contrasenia, dni], (err, resultUsuarios) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }

    if (resultUsuarios.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    db.query(queryEspecialistas, [especialista.horasSupervisor, especialista.titulos, dni],
      (err2, resultEspecialistas) => {
        if (err2) {
          console.error('Error al actualizar especialista:', err2);
          return res.status(500).json({ error: 'Error al actualizar especialista' });
        }

        res.json({
          message: 'Especialista y usuario actualizados correctamente ✅',
        });
      }
    );
  }
  );
});

//SESION
//creacion de una sesion
app.post('/sesiones', (req, res) => {
  const { fecha, horaInicio, descripcionSesion, idSindrome, dniPaciente,
    dniEspecialista, idTratamiento, observacionesSesion, duracionSesion
  } = req.body;

  const query = 'INSERT INTO sesiones (fecha, horaInicio, descripcionSesion, idSindrome, dniPaciente, dniEspecialista, idTratamiento, observacionesSesion, duracionSesion) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [fecha, horaInicio, descripcionSesion, idSindrome, dniPaciente,
    dniEspecialista, idTratamiento, observacionesSesion, duracionSesion], (err, result) => {
      if (err) {
        console.error('Error al insertar sesion:', err);
        return res.status(500).json({ error: 'Error al insertar sesion' });
      }
      res.json({ message: 'Sesión creada', idSesion: result.insertId });
    });
});

//creacion de un registro en sesiones_sintomas
app.post('/sesiones/sintomas', (req, res) => {
  const { idSesion, sintomas } = req.body;

  if (!idSesion || !Array.isArray(sintomas)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const values = sintomas.map(s => [idSesion, s.idSintoma, s.fechaInicioSintoma, s.nivelMolestia]);

  const query = `
    INSERT INTO sesiones_sintomas (idSesion, idSintoma, fechaInicioSintoma, nivelMolestia)
    VALUES ?
  `;

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error al insertar síntomas de sesión:', err);
      return res.status(500).json({ error: 'Error al insertar síntomas' });
    }
    res.json({ message: 'Síntomas registrados correctamente' });
  });
});

//creacion de un registro en sesiones_insumos
app.post('/sesiones/insumos', (req, res) => {
  const { idSesion, insumos } = req.body;

  if (!idSesion || !Array.isArray(insumos)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const values = insumos.map(i => [idSesion, i.idInsumo, i.cantidadUsada]);

  const query = `
    INSERT INTO sesiones_insumos (idSesion, idInsumo, cantidadUsada)
    VALUES ?
  `;

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error al insertar insumos de sesión:', err);
      return res.status(500).json({ error: 'Error al insertar insumos' });
    }
    res.json({ message: 'Insumos registrados correctamente' });
  });
});

// Registrar en sesiones_pasantes los pasantes que estuvieron involucrados en la sesion
app.post('/sesiones/:idSesion/pasantes', (req, res) => {
  const idSesion = req.params.idSesion;
  const dniPasantes = req.body.dniPasantes;

  if (!Array.isArray(dniPasantes) || dniPasantes.length === 0) {
    return res.status(400).json({ error: 'No se recibieron pasantes válidos' });
  }

  const sql = 'INSERT INTO sesiones_pasantes (idSesion, dniPasante) VALUES ?';
  const values = dniPasantes.map(dni => [idSesion, dni]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error al registrar pasantes de la sesión:', err);
      return res.status(500).json({ error: 'Error al registrar pasantes de la sesión' });
    }
    res.json({ message: 'Pasantes registrados correctamente', result });
  });
});



//HISTORIAL CLINICO
//Traer a todos los pacientes (ya sean en estado activo o inactivo)
app.get('/pacientesHistorialClinico', (req, res) => {
  const query = `SELECT u.dniUsuario as dniPaciente, u.nombreYApellido, u.telefono, u.mail, 
                u.nombreUsuario, u.contrasenia, p.obraSocial, p.fechaNacimiento, p.sexo
                 FROM usuarios u 
                 INNER JOIN pacientes p ON p.dniPaciente = u.dniUsuario
                `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener pacientes:', err);
      return res.status(500).json({ error: 'Error al obtener pacientes' });
    }
    res.json(results);
  });
});

//Traer las sesiones con los especialistas, pacientes, sindromes y tratamiento
//Tambien se usa este metodo en la opcion Listado-Sesiones en el menu del Administrador 
app.get('/sesiones/listadoSesiones', (req, res) => {
  const query = `SELECT s.idSesion, s.fecha, s.horaInicio, s.descripcionSesion, 
  s.idSindrome, si.descripcion AS descripcionSindrome, s.dniPaciente, p.nombreYApellido AS nombreYApellidoPaciente, 
  s.dniEspecialista, e.nombreYApellido AS nombreYApellidoEspecialista, s.idTratamiento, t.nombre AS descripcionTratamiento
    FROM sesiones s
    INNER JOIN usuarios e ON e.dniUsuario = s.dniEspecialista
    INNER JOIN usuarios p ON p.dniUsuario = s.dniPaciente
    INNER JOIN sindromes si ON si.idSindrome = s.idSindrome
    INNER JOIN tratamientos t ON t.idTratamiento = s.idTratamiento
    ORDER BY s.fecha desc
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener sesiones:', err);
      return res.status(500).json({ error: 'Error al obtener sesiones' });
    }
    res.json(results);
  });
});

//Traer las sesiones correspondientes de un paciente
app.get('/sesiones/dniPaciente/:dni', (req, res) => {
  const { dni } = req.params;
  const query = `SELECT s.idSesion, s.fecha, s.horaInicio, s.descripcionSesion, 
  s.idSindrome, si.descripcion AS descripcionSindrome, s.dniPaciente, p.nombreYApellido AS nombreYApellidoPaciente, 
  s.dniEspecialista, e.nombreYApellido AS nombreYApellidoEspecialista, s.idTratamiento, t.nombre AS descripcionTratamiento,
  s.observacionesSesion, s.duracionSesion
    FROM sesiones s
    INNER JOIN usuarios e ON e.dniUsuario = s.dniEspecialista
    INNER JOIN usuarios p ON p.dniUsuario = s.dniPaciente
    INNER JOIN sindromes si ON si.idSindrome = s.idSindrome
    INNER JOIN tratamientos t ON t.idTratamiento = s.idTratamiento
    WHERE s.dniPaciente = ? 
    ORDER BY s.fecha desc;
  `;
  db.query(query, [dni], (err, results) => {
    if (err) {
      console.error('Error al obtener sesiones:', err);
      return res.status(500).json({ error: 'Error al obtener sesiones' });
    }
    res.json(results);
  });
});

//Traer los sintomas que se presento en la sesion correspondiente.
//Se usa en la pagina detalle-sesion
app.get('/sesiones/:idSesion', (req, res) => {
  const { idSesion } = req.params;
  const query = `SELECT se.fecha as fecha, p.nombreYApellido AS nombreYApellidoPaciente, e.nombreYApellido AS nombreYApellidoEspecialista,
  s.descripcion as descripcionSintoma, sind.descripcion AS descripcionSindrome,  t.nombre as descripcionTratamiento, se.descripcionSesion, 
  se.observacionesSesion, se.duracionSesion
    FROM sesiones se
    INNER JOIN sesiones_sintomas ss ON se.idSesion = ss.idSesion
    INNER JOIN sintomas s ON ss.idSintoma = s.idSintoma
    INNER JOIN sindromes sind ON se.idSindrome = sind.idSindrome
    INNER JOIN usuarios e ON e.dniUsuario = se.dniEspecialista
    INNER JOIN usuarios p ON p.dniUsuario = se.dniPaciente
    INNER JOIN tratamientos t ON t.idTratamiento = se.idTratamiento
    WHERE ss.idSesion = ?;
  `;
  db.query(query, [idSesion], (err, results) => {
    if (err) {
      console.error('Error al obtener sesion con los sintomas:', err);
      return res.status(500).json({ error: 'Error al obtener sesion con los sintomas' });
    }
    res.json(results);
  });
});

//Traer las sesiones en las que participo el pasante con dniPasante
//Este metodo se usa en la opcion Ver Sesiones del menu del Pasante
app.get('/sesionesConPasante/:dniPasante', (req, res) => {
  const { dniPasante } = req.params;
  const query = `SELECT s.idSesion, s.fecha, s.horaInicio, s.descripcionSesion, 
  s.idSindrome, si.descripcion AS descripcionSindrome, s.dniPaciente, p.nombreYApellido AS nombreYApellidoPaciente, 
  s.dniEspecialista, e.nombreYApellido AS nombreYApellidoEspecialista, s.idTratamiento, t.nombre AS descripcionTratamiento,
  s.observacionesSesion, s.duracionSesion 
    FROM sesiones s
    INNER JOIN usuarios e ON e.dniUsuario = s.dniEspecialista
    INNER JOIN usuarios p ON p.dniUsuario = s.dniPaciente
    INNER JOIN sindromes si ON si.idSindrome = s.idSindrome
    INNER JOIN tratamientos t ON t.idTratamiento = s.idTratamiento
    INNER JOIN sesiones_pasantes sp ON sp.idSesion = s.idSesion
    INNER JOIN pasantes pas ON pas.dniPasante = sp.dniPasante
    WHERE pas.dniPasante = ? 
    ORDER BY s.fecha desc;
  `;
  db.query(query, [dniPasante], (err, results) => {
    if (err) {
      console.error('Error al obtener sesiones:', err);
      return res.status(500).json({ error: 'Error al obtener sesiones' });
    }
    res.json(results);
  });
});

//SINTOMAS
//Obtener síntomas
app.get('/sintomas', (req, res) => {
  const query = 'SELECT idSintoma, descripcion FROM sintomas';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//SINDROMES
//Obtener sindromes segun coincidencia de lista 
//Esta consulta es usada para la etapa de mostrar diagnostico en la opcion Registrar Sesion en el usuario Especialista
app.post('/sindromes/sintomas', (req, res) => {
  const { idsSintomas } = req.body;

  if (!idsSintomas || idsSintomas.length === 0) {
    return res.status(400).json({ error: 'No se enviaron síntomas' });
  }

  const placeholders = idsSintomas.map(() => '?').join(',');

  const sql = `
    SELECT 
      s.idSindrome,
      s.descripcion,
      COUNT(ss.idSintoma) AS coincidencia,
      ROUND((COUNT(ss.idSintoma) / total.total_sintomas) * 100, 0) AS porcentajeCoincidencia
    FROM sindromes s
    JOIN sindromes_sintomas ss ON s.idSindrome = ss.idSindrome
    JOIN (
      SELECT idSindrome, COUNT(idSintoma) AS total_sintomas
      FROM sindromes_sintomas
      GROUP BY idSindrome
    ) AS total ON s.idSindrome = total.idSindrome
    WHERE ss.idSintoma IN (${placeholders})
    GROUP BY s.idSindrome
    ORDER BY porcentajeCoincidencia DESC, coincidencia DESC;
  `;

  db.query(sql, idsSintomas, (err, results) => {
    if (err) {
      console.error('Error al obtener síndromes:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    console.log('Resultados de la consulta sindromes-por-sintomas:', results);
    res.json(results);
  });
});

//Crear un sindrome
//Usado cuando se va a la seccion de Registrar Puntos apretando el boton "Otro Sindrome" en Mostrar Sindromes
app.post('/sindromes', (req, res) => {
  const { descripcion } = req.body;
  const sql = 'INSERT INTO sindromes (descripcion) VALUES (?)';

  db.query(sql, [descripcion], (err, result) => {
    if (err) {
      console.error('Error al crear síndrome:', err);
      return res.status(500).json({ error: 'Error al crear síndrome' });
    }
    res.json({ idSindrome: result.insertId }); //devolvemos el id generado
  });
});

//TRATAMIENTOS
//Obtener tratamientos para el sindrome seleccionado
//Este metodo se usa en la etapa de Mostrar Puntos en la opcion Registrar Sesion
app.get('/tratamientos/:idSindrome', (req, res) => {
  const { idSindrome } = req.params;
  const query = `
    SELECT t.idTratamiento, t.nombre, t.descripcion, t.puntos
    FROM tratamientos t
    INNER JOIN sindromes_tratamientos st ON t.idTratamiento = st.idTratamiento
    WHERE st.idSindrome = ?;
  `;

  db.query(query, [idSindrome], (err, results) => {
    if (err) {
      console.error('Error al obtener tratamientos:', err);
      res.status(500).json({ error: 'Error al obtener tratamientos' });
    } else {
      res.json(results);
    }
  });
});

//Crear un nuevo tratamiento
//Usado cuando se va a la seccion de Registrar Puntos apretando el boton "Otro Sindrome" en Mostrar Sindromes
app.post('/tratamientos', (req, res) => {
  const { nombre, descripcion, puntos } = req.body;
  const sql = 'INSERT INTO tratamientos (nombre, descripcion, puntos) VALUES (?, ?, ?)';

  db.query(sql, [nombre, descripcion, puntos], (err, result) => {
    if (err) {
      console.error('Error al crear tratamiento:', err);
      return res.status(500).json({ error: 'Error al crear tratamiento' });
    }
    res.json({ idTratamiento: result.insertId }); //devolvemos el id generado
  });
});

// =============================
// ANTECEDENTES DEL PACIENTE
// =============================
//Crear los antecedentes
app.post('/antecedentes', (req, res) => {
  const { tipoAntecedente, descripcion, dniPaciente } = req.body;

  const sql = `INSERT INTO antecedentes 
               (tipoAntecedente, descripcion, dniPaciente) 
               VALUES (?, ?, ?)`;

  db.query(sql, [tipoAntecedente, descripcion, dniPaciente], (err, result) => {
    if (err) {
      console.error('Error al crear antecedente:', err);
      return res.status(500).json({ error: "Error al crear antecedente" });
    }
    res.json({ idAntecedente: result.insertId }); // devolvemos el id generado
  });
});

//Obtener los antecedentes del paciente con dniPaciente
app.get('/antecedentes/:dniPaciente', (req, res) => {
  console.log('Entra a la peticion del antecedentes/:dniPaciente para obtener los antecedentes')
    const dniPaciente = req.params.dniPaciente;

    const query = `
        SELECT idAntecedentes, tipoAntecedente, descripcion, dniPaciente
        FROM antecedentes 
        WHERE dniPaciente = ?
    `;

    db.query(query, [dniPaciente], (err, results) => {
        if (err) {
            console.error("Error al obtener antecedentes:", err);
            return res.status(500).json({ error: "Error en la base de datos." });
        }

        return res.json(results);
    });
});

//RECUPERAR CONTRASEÑA
// Generar token y enviar email
app.post('/usuarios/enviar-link-recuperacion', (req, res) => {
  const { mail, nombreUsuario } = req.body;

  const buscarUsuario = 'SELECT dniUsuario FROM usuarios WHERE mail = ? AND nombreUsuario = ?';
  db.query(buscarUsuario, [mail, nombreUsuario], (err, resultados) => {
    if (err) return res.status(500).send('Error al buscar usuario');
    if (resultados.length === 0) return res.status(404).send('Usuario no encontrado');

    const dniUsuario = resultados[0].dniUsuario;
    const token = crypto.randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos

    const insertarToken = `
      INSERT INTO tokens_recuperacion (dniUsuario, token, expiracion)
      VALUES (?, ?, ?)
    `;
    db.query(insertarToken, [dniUsuario, token, expiracion], (err) => {
      if (err) return res.status(500).send('Error al guardar token');

      // URL de recuperación (localhost)
      const link = `http://localhost:4200/recuperar-password/${token}`;

      // Configurar envío de correo con Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER, // tu gmail
          pass: process.env.PASSWORD // app password o clave generada
        }
      });

      const mailOptions = {
        from: process.env.USER,
        to: mail,
        subject: 'Recuperación de contraseña',
        html: `
          <h3>Recuperación de contraseña</h3>
          <p>Hola ${nombreUsuario}, haz clic en el siguiente enlace para cambiar tu contraseña:</p>
          <a href="${link}">${link}</a>
          <p>El enlace expira en 15 minutos.</p>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          return res.status(500).json({ message: 'No se pudo enviar el correo' });
        }

        console.log('Correo enviado:', info.response);
        return res.status(200).json({ message: 'Correo enviado correctamente' });
      });
    });
  });
});

// 🔹 Validar token
app.get('/usuarios/validar-token/:token', (req, res) => {
  const { token } = req.params;
  const query = 'SELECT * FROM tokens_recuperacion WHERE token = ? AND expiracion > NOW()';
  db.query(query, [token], (err, resultados) => {
    if (err) return res.status(500).send('Error al validar token');
    if (resultados.length === 0) return res.status(404).send('Token inválido o expirado');
    res.json(resultados[0]);
  });
});

// Cambiar contraseña
app.post('/usuarios/actualizar-password', (req, res) => {
  const { token, nuevaPassword } = req.body;

  if (!token || !nuevaPassword) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Verificar que el token exista y no haya expirado
  const queryToken = 'SELECT dniUsuario FROM tokens_recuperacion WHERE token = ? AND expiracion > NOW()';
  db.query(queryToken, [token], (err, resultados) => {
    if (err) return res.status(500).json({ message: 'Error al validar token' });
    if (resultados.length === 0) return res.status(404).json({ message: 'Token inválido o expirado' });

    const dniUsuario = resultados[0].dniUsuario;

    //Actualizar la contraseña del usuario
    const update = 'UPDATE usuarios SET contrasenia = ? WHERE dniUsuario = ?';
    db.query(update, [nuevaPassword, dniUsuario], (err) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar contraseña' });

      // Eliminar token usado para que no pueda reutilizarse
      db.query('DELETE FROM tokens_recuperacion WHERE token = ?', [token], (delErr) => {
        if (delErr) {
          console.error('Error al eliminar token usado:', delErr);
          // No detenemos el flujo por este error
        }
      });
      console.log(`Contraseña actualizada correctamente para el usuario con DNI: ${dniUsuario}`);
      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    });
  });
});