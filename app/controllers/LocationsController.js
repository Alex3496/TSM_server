
//MODELOS
const Locations = require('../../models/locations');

/**
 * @class LocationsController
 * @description Controlador para administrar las ubicaciones de los locations
 */
class LocationsController {


    /**
     * @static
     * @memberof LocationsController
     * @description Añade una nueva ubicacion al sistema
     */
    static add = async ({ body, user, files }, response) => {
        console.log("user", user);
        console.log("body", body);

        body.usuario_padre_id = user._id;

        let location = new Locations(body);

        await location.save()
        .then(location => {
            return response.status(200).json(location)
        }).catch(error => {
            console.log("error", error);
            return response.status(400).json({message: "Error al crear el location"})
        })
    };

    /**
     * @static
     * @memberof LocationsController
     * @description Actualiza la informacion de una ubucacion
     */
    static update = async ({ body, files }, response) => {

        let location = await Locations.findOne({ _id: body.location_id });
        if(!location) return response.status(400).json({message: "Location no encontrado"})

        if(body.nombre != undefined) location.nombre = body.nombre;
        if(body.nombre_contacto != undefined) location.nombre_contacto = body.nombre_contacto;
        if(body.email_contacto != undefined) location.email_contacto = body.email_contacto;
        if(body.telefono != undefined) location.telefono = body.telefono;
        if(body.sites_notas != undefined) location.sites_notas = body.sites_notas;
        if(body.internal_notas != undefined) location.internal_notas = body.internal_notas;
        if(body.horario != undefined) location.horario = body.horario;
        if(body.appointment != undefined) location.appointment = body.appointment;
        if(body.location_requirement != undefined) location.location_requirement = body.location_requirement;

        if(body.direccion1 != undefined) location.direccion1 = body.direccion1;
        if(body.direccion2 != undefined) location.direccion2 = body.direccion2;
        if(body.ciudad != undefined) location.ciudad = body.ciudad;
        if(body.estado_id != undefined) location.estado_id = body.estado_id;
        if(body.pais_id != undefined) location.pais_id = body.pais_id;
        if(body.codigo_postal != undefined) location.codigo_postal = body.codigo_postal;

        if(body.status != undefined) location.status = body.status;


        location.save()
        .then(location => {
            return response.status(200).json({message: "Location updated"})
        }).catch(error => {
            return response.status(400).json({message: "Error updating location"})
        })
        
    };

    /**
     * @static
     * @memberof LocationsController
     * @description Obtiene un location especifico
     */
    static get = async ({ params, query }, response) => {

        let location = await Locations.findOne({_id: params?.id})
            .populate('pais_id')
            .populate('estado_id')
            .lean();

        if(!location) return response.status(404).json({ message: 'Cliente no encontrado'})

        return response.status(200).json(location)
    };

    /**
     * @static
     * @memberof LocationsController
     * @description Retorna la lista de locations del sistema
     */
    static list = async ({ query, files, user }, response) => {
        console.log("user", user);

        let body = query;

        let pipeline = []

        if (body.search) {
            let buscar = (body.search == undefined) ? '.*' : body.search + '.*'
            pipeline.push({
                '$match': {
                    '$or': [
                        { 'nombre': new RegExp(buscar, "i") },
                        { 'nombre_contacto': new RegExp(buscar, "i") },
                        { 'email_contacto': new RegExp(buscar, "i") },
                        { 'telefono': new RegExp(buscar, "i") }
                    ]
                }
            })
        }

        pipeline.push(
            {
                $lookup:{
                    from: "paises",
                    localField: "pais_id",
                    foreignField: "_id",
                    as: "pais_id"
                }
            },{
                $unwind:{
                    path: "$pais_id"
                }
            },{
                $lookup:{
                    from: "estados",
                    localField: "estado_id",
                    foreignField: "_id",
                    as: "estado_id"
                }
            },{
                $unwind:{
                    path: "$estado_id"
                }
            }
        )

        let locations = await Locations.aggregatePaginate(Locations.aggregate(pipeline), {
            page: (body.page == undefined) ? 1 : body.page,
            limit: (body.limit == undefined) ? 10 : body.limit
        })

        return response.status(200).json(locations);
        
    };

    /**
     *
     *
     * @static
     * @memberof LocationsController
     * @description Elimina un location de la BD
     */
    static delete = async ({ query }, response) => {

        const location = await Locations.findOneAndDelete({_id: query.location_id})

        if(!location) return response.status(404).json({ message: 'Location not found'})

        return response.status(200).json({
            message: 'Location deleted!'
        })
    };


}

module.exports = LocationsController;
