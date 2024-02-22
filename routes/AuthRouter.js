//LIBRERIAS
const express = require('express')
//CONTROLADORES
const AuthController = require('../app/controllers/AuthController.js');

const router = express.Router();

module.exports = router
    .post('/login',	AuthController.login)

   


