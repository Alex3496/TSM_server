//LIBRERIAS
const express = require('express');
//CONTROLADOR
const TrailersController = require('../app/controllers/TrailersController');
//MIDDLEWARES
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

//const { hasPermission, Permisos } = require('../app/Permissions');

const router = express.Router()

module.exports = router
    .post('/trailers',		[AuthMiddleware],    TrailersController.add)
    .get('/trailers',		[AuthMiddleware],    TrailersController.list)
    .get('/trailers/:id',	[AuthMiddleware],    TrailersController.get)
    .put('/trailers',		[AuthMiddleware],    TrailersController.update)
    .delete('/trailers',	[AuthMiddleware],    TrailersController.delete)
    
