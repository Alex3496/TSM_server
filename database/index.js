// Importación de librerías
const mongoose = require('mongoose');

// Configuración para deshabilitar el modo estricto de consulta y de populación
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

// Conexión a la base de datos
mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Conexión exitosa a la base de datos: ' + mongoose.connection.name);
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error.message);
    });

// Obtiene una referencia a la conexión a la base de datos
const db = mongoose.connection;

// Exporta la conexión para que pueda ser utilizada en otras partes de tu aplicación
module.exports = db;