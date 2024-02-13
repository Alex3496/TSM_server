//IMPORTACION DE LIBRERIAS
const cors = require('cors');
const express = require('express');
const fileupload = require("express-fileupload");
const requestIP = require('request-ip')

const ClientesRouter = require('./routes/ClientesRouter');
const PaisesEstadosRouter = require('./routes/PaisesEstadosRouter');

module.exports = function () {

	const app = express();

	//middlewares
	app.use(cors({
		origin: true,
		credentials: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		optionsSuccessStatus: 200
	}))
	var bodyParser = require('body-parser');
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static('public'))
	app.use(fileupload());
	app.use(requestIP.mw())

	//route inicio de prueba
	app.get('/', (request, response) => {
		response.send(' - TSM SERVER -')
	});


	//AGREGAR RUTAS AL SERVIDOR
	app.use(
		ClientesRouter,
		PaisesEstadosRouter
	);
	
	return app;
}