//LIBRERIAS
const dayjs = require('dayjs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const mongoosePaginate = require('mongoose-paginate-v2');
const MongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');


const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;

// Config dayjs
dayjs.extend(utc)
dayjs.extend(timezone)


const Usuarios = new Schema({

	nombre: {
		type: String,
	},
	apellidos: {
		type: String,
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
	},
	/**
	 * 1 - Admin
	 * 2 - Comun
	 * */
	tipo:{
		type: Number,
		default: 2
	},
	rol_id: {
		type: ObjectId,
		ref: "roles"
	},
	activo: {
		type: Boolean,
		required: true,
		default: true
	},

}, {
	timestamps: true
})


/**
 * @callback pre "SAVE"
 * @description  Encripta la password del usuario
 * */
.pre('save', async function () {

	if (this.password !== undefined && this.password !== "") {
		const salt = await bcrypt.genSalt(8); //Semilla para el hashing
		const hashPassword = await bcrypt.hash(this.password, salt);
		this.password = hashPassword;
	}
})




/**
* @static
* @methods
* @function login
*
* @description Verifica si el usuario esta registrado y la contraseña sea corercta.
* Retorna el token de acceso en caso correcto. Si no, arroja una excepecion,
* El usuario con rol Encuestador no puede inicar sesion
*
* @param email
* Correo del usuario
*
* @param password
* Contraseña
*
* */
Usuarios.statics.login = async function ({ email, password }) {


	const user = await this.model('usuarios').findOne({ email }).populate("rol_id").lean()
	if(!user) throw "Usuario no registrado"

	//Comparamos las contraseñas
	let contrasenasCoinciden = await bcrypt.compare(password, user?.password || "")


	//Si hay un ultimo intento y las contraseñas no coinciden
	if (!contrasenasCoinciden) {
		
		throw "Credenciales incorrectas."
	}

	//Si las contraseñas son correctas
	if (contrasenasCoinciden) {
		let vencimiento = dayjs.tz(Date.now(), "GMT").add(process.env.SECRET_TIME_VALID.slice(0, -1), process.env.SECRET_TIME_VALID.slice(-1)).toDate()


		let token = 'Bearer ' + jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: process.env.SECRET_TIME_VALID })


		return {
			token: token,
			user
		}
	} else {
		throw "Credenciales incorrectas."
	}

};




Usuarios.plugin(mongoosePaginate);
Usuarios.plugin(MongooseAggregatePaginateV2)


let UsuariosModel = mongoose.model('usuarios', Usuarios)
UsuariosModel.aggregatePaginate.options = {
	customLabels: {
		totalDocs: 'total',
		docs: 'data',
		limit: 'limit',
		page: 'page',
		nextPage: 'next',
		prevPage: 'prev',
		totalPages: 'pages',
	},
	collation: { locale: 'es' }
};
module.exports = UsuariosModel
