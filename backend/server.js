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
  const { nombre, descripcion, cantidad} = req.body;
  const estado = 'activo';

  if (!nombre || !cantidad || !descripcion) {
    return res.status(400).json({ error: 'nombre, descripcion y cantidad son obligatorios' });
  }

  const query = 'INSERT INTO insumos (nombre, descripcion, cantidad, estado) VALUES ( ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, cantidad, estado], (err, result) => {
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

//USUARIO
//Obtener usuarios 
app.get('/usuarios', (req, res) => {
  const query = `
    SELECT dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario
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

//Obtener los datos de los pacientes y especialistas
//Usado en el metodo getEspecialistasYPacientes del servicio turnos.ts en el componente modificar-turno
app.get('/turnos/especialistas-y-pacientes', (req, res) => {
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
      console.error('Error obteniendo los especialistas y pacientes de cada turno:', err);
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

  // Insertar en tabla usuarios
  const sqlUsuario = `INSERT INTO usuarios (dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlUsuario, [dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad], (err) => {
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

//PASANTE
// insertar en la tabla usuarios y pasantes el Registro de USUARIO + PASANTE
// ==============================================================================
app.post('/pasantes', (req, res) => {
  const { usuario, pasante } = req.body;

  const { dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad } = usuario;
  const { horasPasante, institucion, mesInicio, anioInicio, docente, mailDocente, categoria } = pasante;

  // Insertar en tabla usuarios
  const sqlUsuario = `INSERT INTO usuarios (dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlUsuario, [dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad], (err) => {
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

//ESPECIALISTA
// insertar en la tabla usuarios y especialistas el Registro de USUARIO + ESPECIALISTA (usado en el crear especialista)
// ===================================================================================
app.post('/especialistas', (req, res) => {
  const { usuario, especialista } = req.body;

  const { dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad } = usuario;
  const { horasSupervisor, titulos } = especialista;

  // Insertar en tabla usuarios
  const sqlUsuario = `INSERT INTO usuarios (dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad, estado) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlUsuario, [dniUsuario, nombreYApellido, telefono, mail, nombreUsuario, contrasenia, tipoUsuario, idLocalidad,'activo'], (err) => {
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
  const { fecha, horaInicio, minutosAgujasPuestas, cantidadAgujasUsadas, idSindrome, dniPaciente,
    dniEspecialista, idTratamiento
  } = req.body;

  if (!nombre || !cantidad || !descripcion) {
    return res.status(400).json({ error: 'campos obligatorios' });
  }

  const query = 'INSERT INTO insumos (fecha, horaInicio, minutosAgujasPuestas, cantidadAgujasUsadas, idSindrome, dniPaciente, dniEspecialista, idTratamiento) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [fecha, horaInicio, minutosAgujasPuestas, cantidadAgujasUsadas, idSindrome, dniPaciente,
    dniEspecialista, idTratamiento], (err, result) => {
      if (err) {
        console.error('Error al insertar sesion:', err);
        return res.status(500).json({ error: 'Error al insertar sesion' });
      }
      res.json({ message: 'Sesión creada' });
    });
});

//listado de sesiones, incluyendo descripcion de especialisa, paciente, sindrome y sesion
app.get('/sesiones/listadoSesiones', (req, res) => {
  const query = `SELECT s.idSesion, s.fecha, s.horaInicio, s.minutosAgujasPuestas, s.cantidadAgujasUsadas, 
  s.idSindrome, si.descripcion AS descripcionSindrome, s.dniPaciente, p.nombreYApellido AS nombreYApellidoPaciente, 
  s.dniEspecialista, e.nombreYApellido AS nombreYApellidoEspecialista, s.idTratamiento, t.nombre AS descripcionTratamiento
    FROM sesiones s
    INNER JOIN usuarios e ON e.dniUsuario = s.dniEspecialista
    INNER JOIN usuarios p ON p.dniUsuario = s.dniPaciente
    INNER JOIN sindromes si ON si.idSindrome = s.idSindrome
    INNER JOIN tratamientos t ON t.idTratamiento = s.idTratamiento
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener sesiones:', err);
      return res.status(500).json({ error: 'Error al obtener sesiones' });
    }
    res.json(results);
  });
});

