require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const mysql = require('mysql2/promise');

// Un "pool" de conexiones es más eficiente que crear una conexión nueva
// para cada consulta a la base de datos.
const pool = mysql.createPool({
  // Leemos la configuración desde las variables de entorno
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos un objeto con un método `query` para que el resto de la
// aplicación pueda interactuar con la base de datos de forma sencilla.
module.exports = {
  query: (sql, params) => pool.execute(sql, params),
};