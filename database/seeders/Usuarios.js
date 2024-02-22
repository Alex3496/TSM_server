
const Usuarios = require('../../models/usuarios');

async function seeder () {

    console.log("USUARIOS");
    console.log('------------ ESPERE UN MOMENTO ---------- ')


    Usuarios.create({
    	nombre: "Manuel Alejandro",
    	apellidos: "Elizondo Tello",
    	email: "elizondo.manuel.101c@gmail.com",
    	password: "123456",
    })

    

    console.log('------------ HECHO ---------- ')

}

module.exports = {
    title: "Crear Usuarios",
    description: "",
    seeder
}