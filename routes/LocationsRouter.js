//LIBRERIAS
const express = require('express');
//CONTROLADOR
const LocationsController = require('../app/controllers/LocationsController');
//MIDDLEWARES
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

//const { hasPermission, Permisos } = require('../app/Permissions');

const router = express.Router()

module.exports = router
    .post('/locations',		[AuthMiddleware],    LocationsController.add)
    .get('/locations',		[AuthMiddleware],    LocationsController.list)
    .get('/locations/:id',	[AuthMiddleware],    LocationsController.get)
    .put('/locations',		[AuthMiddleware],    LocationsController.update)
    .delete('/locations',	[AuthMiddleware],    LocationsController.delete)
    
