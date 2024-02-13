const express = require('express');

//const AuthorizationMiddleware = require('../app/middlewares/AuthorizationMiddleware');

const PaisesEstadosController = require('../app/controllers/PaisesEstadosController')

const router = express.Router();

const paisesEstados = new PaisesEstadosController()


module.exports = router
    .get('/paises', paisesEstados.paises)
    .get('/estados', paisesEstados.estados)
    .get('/pais', paisesEstados.get)
