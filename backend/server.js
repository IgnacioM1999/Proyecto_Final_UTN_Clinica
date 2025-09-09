// c:\Users\valer\Proyecto_Final_UTN_Clinica\backend\server.js

// servidor.js
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const express = require('express');
const verificarAutenticacion = require('./middleware/auth.js'); // Corregimos la ruta de importación
const db = require('./db'); // Importamos la conexión a la BD
const app = express();
const puerto = 3000;

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, '../src')));

// Middleware para que Express pueda entender JSON en el cuerpo de las peticiones
app.use(express.json());

// Ruta pública (no necesita autenticación)
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la Clínica! Visita /login para iniciar sesión.');
});

// Ruta para servir la página de login
// c:\Users\valer\Proyecto_Final_UTN_Clinica\backend\server.js
// ...
// Ruta para servir la página de login
app.get('/iniciar-sesion', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/app/pages/login/login.html'));
});

// Rutas protegidas
// El middleware se pasa como segundo argumento. Se ejecutará antes de la función final.
app.get('/perfil', verificarAutenticacion, (req, res) => {
  // Gracias al middleware, aquí ya sabemos que el usuario está autenticado.
  // Ni siquiera vemos el token, solo usamos los datos que el middleware nos preparó.
  res.send(`Hola, ${req.usuario.nombre}. ¡Bienvenido a tu perfil!`);
});

app.get('/configuracion', verificarAutenticacion, (req, res) => {
  // La lógica de esta ruta es simple y directa.
  res.send(`Página de configuración para el usuario con ID: ${req.usuario.id}`);
});

// Ruta para registrar un nuevo usuario
app.post('/registrar', async (req, res) => {
  const { nombre, email, password } = req.body;

  // Validación simple de entrada
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // 1. Hashear la contraseña de forma segura
    const saltRounds = 10; // Factor de coste para el hasheo
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 2. Generar un token de API único y seguro
    const apiToken = crypto.randomBytes(32).toString('hex');

    // 3. Insertar el nuevo usuario en la base de datos
    const sql = 'INSERT INTO usuarios (nombre, email, password_hash, api_token) VALUES (?, ?, ?, ?)';
    await db.query(sql, [nombre, email, passwordHash, apiToken]);

    // 4. Enviar una respuesta exitosa (sin devolver datos sensibles)
    res.status(201).json({ message: 'Usuario registrado con éxito.', api_token: apiToken });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar el usuario.' });
  }
});

app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});
