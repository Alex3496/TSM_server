//LIBRERIAS
const express = require('express');
//CONTROLADOR
const ClientesController = require('../app/controllers/ClientesController');
//MIDDLEWARES
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

//const { hasPermission, Permisos } = require('../app/Permissions');

const router = express.Router()

module.exports = router
    .post('/clientes',		[AuthMiddleware],    ClientesController.add)
    .get('/clientes',		[AuthMiddleware],    ClientesController.list)
    .get('/clientes/:id',	[AuthMiddleware],    ClientesController.get)
    .put('/clientes',		[AuthMiddleware],    ClientesController.update)
    .delete('/clientes',	[AuthMiddleware],    ClientesController.delete)
    
