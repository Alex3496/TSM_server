// Importación de librerías
const http = require('http');
const dotenv = require('dotenv');

// Carga de variables de entorno desde el archivo .env
dotenv.config();

// Importación de la aplicación y la base de datos
const app = require('./app')(); 
const db = require('./database');

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 4000;

// Creación del servidor HTTP
const httpServer = http.createServer(app); 

// Inicio del servidor HTTP
httpServer.listen(PORT, () => {
    console.log('HTTP Server running on port ' + PORT);
});
