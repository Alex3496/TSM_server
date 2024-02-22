
//MODELOS
const Usuarios = require('../../models/usuarios');


/**
 * @class AuthController
 * @description Clase que contiene los metodos de logeado del sistema
 */
class AuthController {

    /**
     * @static
     * @memberof AuthController
     *
     * @method add
     * @description Añade un nuevo usuario, desde el registro del formulario publico
     * */
    static register = async ({ body }, response) => {

        const { email, password, confirm } = body

        /* La confirmacion de contrasenas coinciden */
        if (password !== confirm) return response.status(400).json({
            success: false,
            message: "Las contrasenas no coinciden"
        })

        let user_T = await Usuarios.findOne({ email: email })
        if (user_T) {
            return response.status(400).json({
                message: 'Usuario ya registrado'
            })
        }

        body.apellidos = body.apellido_paterno

        // let prospecto = new Prospectos(body)

        let user = new Usuarios(body);

        user.save()
            .then(async user => {

                await prospecto.save()


                let new_user = await Usuarios.findOne({ _id: user._id }).select("-password")
                await new_user.save()

                Usuarios.login({ email, password })
                    .then(async success => {
                        console.log("success", success);
                        response.header('Access-Control-Expose-Headers', 'Authorization');
                        return response.header('Authorization', success.token).status(200).json(success)
                    })
                    .catch(error => {
                        console.log("error", error);
                        return response.status(400).json("Error al crear sesión")
                    })
            })
            .catch(error => {
                console.log("error", error);
                return response.status(400).json("Error al registrar el usuario")
            })
    };

    /**
     * @static
     * @memberof AuthController
     *
     * @method login
     * @description Metodo que valida las claves para el acceso al sistema
     * */
    static login = async (request, response) => {

    	let body = request.body

        if (!body.email || !body.password ) {
            return response.status(400).json({ message: 'Formato de la solicitud invalida' })
        } else {
            Usuarios.login({ email: body.email, password: body.password })
                .then(async success => {
                    response.header('Access-Control-Expose-Headers', 'Authorization');
                    return response.header('Authorization', success.token).status(200).json(success)
                })
                .catch(async error => {
                    console.log('error', error)
                    return response.status(400).json({ message: error})
                });
        }
    };


}


module.exports = AuthController;