const jwt = require('jsonwebtoken');
const Usuarios = require('../../models/usuarios');

async function TokenVerify(...args) {
    return new Promise((resolve) => {

        let error = null;
        let decode = null
        try {
            decode = jwt.verify(...args);
        } catch (err) {
            error = err
        }
        resolve([error, decode])
    })
}

/**
 * @function
 * Verifica si el token enviado para la solicitud es valido
 * @request qpeticion enviado desde el front al servidor
 * @respuesta Respuesta desde el servidor al front end
 *
 */
module.exports = async function (request, response, next) {
    
    let token = request.header('Authorization');
    if (!token) token = request.query.Authorization || request.query.athorization

    if(!token) return response.status(401).json({ message: "Token invalido" })

    //Desencriptamos el token de validación
    let [ tokenError, decodeToken ] = await TokenVerify(token?.split(' ')[1], process.env.SECRET)
    let user_id = null;
    
    //Si el token es valido
    if (decodeToken) {
        user_id = decodeToken?._id
    } else {
        return response.status(401).json(tokenError)
    }

    let usuario = await Usuarios.findOne({ _id: user_id }).select('-password').populate("rol_id")

    request.user = usuario;
    next();
}