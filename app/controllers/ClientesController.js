const mongoose = require('mongoose');
//MODELOS
const Clientes = require('../../models/clientes');

const { ObjectId } = mongoose.Types;

/**
 * @class ClientesController
 * @description Controlador 
 */
class ClientesController {


    /**
     * @static
     * @memberof ClientesController
     * @description Añade un nuevo cliente al sistema
     */
    static add = async ({ body, files, user }, response) => {
        console.log("body", body);

        if(user.usuario_padre_id) body.usuario_padre_id = user.usuario_padre_id;
        else body.usuario_padre_id = user._id;

        let cliente = new Clientes(body);

        await cliente.save()
        .then(cliente => {
            return response.status(200).json(cliente)
        }).catch(error => {
            console.log("error", error);
            return response.status(400).json({message: "Error al crear el cliente"})
        })
    };

    /**
     * @static
     * @memberof ClientesController
     * @description Actualiza la informacion de un nuevo
     */
    static update = async ({ body, files }, response) => {

        let cliente = await Clientes.findOne({ _id: body.cliente_id });
        if(!cliente) return response.status(400).json({message: "Cliente no encontrado"})

        if(body.nombre != undefined) cliente.nombre = body.nombre;
        if(body.apellidos != undefined) cliente.apellidos = body.apellidos;
        if(body.email != undefined) cliente.email = body.email;
        if(body.telefono != undefined) cliente.telefono = body.telefono;
        if(body.notas != undefined) cliente.notas = body.notas;

        if(body.direccion1 != undefined) cliente.direccion1 = body.direccion1;
        if(body.direccion2 != undefined) cliente.direccion2 = body.direccion2;
        if(body.ciudad != undefined) cliente.ciudad = body.ciudad;
        if(body.estado_id != undefined) cliente.estado_id = body.estado_id;
        if(body.pais_id != undefined) cliente.pais_id = body.pais_id;
        if(body.codigo_postal != undefined) cliente.codigo_postal = body.codigo_postal;

        if(body.billing_email != undefined) cliente.billing_email = body.billing_email;
        if(body.billing_contact != undefined) cliente.billing_contact = body.billing_contact;
        if(body.billing_phone != undefined) cliente.billing_phone = body.billing_phone;
        if(body.moneda != undefined) cliente.moneda = body.moneda;
        if(body.credito_limite != undefined) cliente.credito_limite = body.credito_limite;
        if(body.credito_diponible != undefined) cliente.credito_diponible = body.credito_diponible;
        if(body.credito_usado != undefined) cliente.credito_usado = body.credito_usado;
        if(body.credito_status != undefined) cliente.credito_status = body.credito_status;
        if(body.status != undefined) cliente.status = body.status;


        cliente.save()
        .then(cliente => {
            return response.status(200).json({message: "Cliente actualizado"})
        }).catch(error => {
            return response.status(400).json({message: "Error al actualizar el cliente"})
        })
        
    };

    /**
     * @static
     * @memberof ClientesController
     * @description Obtiene un cliente especifico
     */
    static get = async ({ params, query }, response) => {

        let cliente = await Clientes.findOne({_id: params?.id})
            .populate('pais_id')
            .populate('estado_id')
            .lean();

        if(!cliente) return response.status(404).json({ message: 'Cliente no encontrado'})

        return response.status(200).json(cliente)
    };

    /**
     * @static
     * @memberof ClientesController
     * @description Retorna la lista de clientes del sistema
     */
    static list = async ({ query, files, user }, response) => {
        console.log("user", user);

        let body = query;

        let pipeline = []

        let usuario_padre_id = null;
        if(user.usuario_padre_id) usuario_padre_id = user.usuario_padre_id
        else usuario_padre_id = user._id;

        if(usuario_padre_id){
            pipeline.push(
                {
                    $match:{
                        usuario_padre_id: new ObjectId(usuario_padre_id)
                    }
                }
            )
        }

        if (body.search) {
            let buscar = (body.search == undefined) ? '.*' : body.search + '.*'
            pipeline.push({
                '$match': {
                    '$or': [
                        { 'nombre': new RegExp(buscar, "i") },
                        { 'apellidos': new RegExp(buscar, "i") },
                        { 'email': new RegExp(buscar, "i") },
                        { 'telefono': new RegExp(buscar, "i") }
                    ]
                }
            })
        }

        let clientes = await Clientes.aggregatePaginate(Clientes.aggregate(pipeline), {
            page: (body.page == undefined) ? 1 : body.page,
            limit: (body.limit == undefined) ? 10 : body.limit
        })

        return response.status(200).json(clientes);
        
    };

    /**
     *
     *
     * @static
     * @memberof ClientesController
     * @description Elimina un cliente de la BD
     */
    static delete = async ({ query }, response) => {

        const cliente = await Clientes.findOneAndDelete({_id: query.cliente_id})

        if(!cliente) return response.status(404).json({ message: 'Cliente no encontrado'})

        return response.status(200).json({
            message: '¡Cliente Eliminado!'
        })
    };


}

module.exports = ClientesController;
