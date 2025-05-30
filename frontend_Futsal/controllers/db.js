// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',  // O la dirección de tu servidor de base de datos
  user: 'root',       // Tu nombre de usuario de base de datos
  password: 'password', // Tu contraseña de base de datos
  database: 'PetMatch' // Nombre de la base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = connection;