// c:\Users\valer\Proyecto_Final_UTN_Clinica\backend\middleware\auth.js

// middleware/auth.js
const db = require('../db'); // Importamos nuestra configuración de la base de datos

async function verificarAutenticacion(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    // Buscamos en la base de datos un usuario con el token proporcionado.
    // Usamos consultas parametrizadas (?) para prevenir inyección SQL.
    const [rows] = await db.query('SELECT id, nombre FROM usuarios WHERE api_token = ?', [token]);

    if (rows.length === 0) {
      // No se encontró ningún usuario con ese token.
      return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
    }

    // Adjuntamos los datos del usuario al objeto `req`
    req.usuario = rows[0];
    next(); // El token es válido, continuamos a la siguiente función.
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = verificarAutenticacion;
