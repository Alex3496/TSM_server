//LIBRERIAS
const express = require('express');
//CONTROLADOR
const DriversController = require('../app/controllers/DriversController');
//MIDDLEWARES
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

//const { hasPermission, Permisos } = require('../app/Permissions');

const router = express.Router()

module.exports = router
    .post('/drivers',		[AuthMiddleware],    DriversController.add)
    .get('/drivers',		[AuthMiddleware],    DriversController.list)
    .get('/drivers/:id',	[AuthMiddleware],    DriversController.get)
    .put('/drivers',		[AuthMiddleware],    DriversController.update)
    .delete('/drivers',		[AuthMiddleware],    DriversController.delete)
    
