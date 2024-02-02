const fs = require('fs');
const mime = require('mime');
const mongoose = require('mongoose');

const Clientes = require('../../models/clientes');

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
    static add = async ({ body, files }, response) => {

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
     * @description Obtiene un cliente especifico
     */
    static get = async ({ params, query }, response) => {

        let cliente = await Clientes.findOne({_id: params.id})
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
    static list = async ({ query, files }, response) => {

        let body = query;

        let pipeline = []

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

}

module.exports = ClientesController;
