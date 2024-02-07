//LIBRERIAS
const express = require('express');
//CONTROLADOR
const ClientesController = require('../app/controllers/ClientesController');
//MIDDLEWARES
//const AuthorizationMiddleware = require('../app/middlewares/AuthorizationMiddleware');

//const { hasPermission, Permisos } = require('../app/Permissions');

const router = express.Router()

module.exports = router
    .post('/clientes',		ClientesController.add)
    .get('/clientes',		ClientesController.list)
    .get('/clientes/:id',	ClientesController.get)
    .put('/clientes',		ClientesController.update)
    .delete('/clientes',	ClientesController.delete)
    
