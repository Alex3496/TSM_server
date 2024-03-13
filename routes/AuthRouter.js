//LIBRERIAS
const express = require('express')
//CONTROLADORES
const AuthController = require('../app/controllers/AuthController.js');
//MIDDLEWARES
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');

const router = express.Router();

module.exports = router
    .post('/login',	        AuthController.login)
    .post('/register',      AuthController.register)
    .get('/user/logged',    [AuthMiddleware],  AuthController.userLogged)

   


