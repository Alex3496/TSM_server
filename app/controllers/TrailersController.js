
//MODELOS
const Trailers = require('../../models/trailers');

/**
 * @class TrailersController
 * @description Controlador de trailes del sistema
 */
class TrailersController {


    /**
     * @static
     * @memberof TrailersController
     * @description Añade un nuevo trailer al sistema
     */
    static add = async ({ body, user, files }, response) => {

        body.usuario_padre_id = user._id;

        let trailer = new Trailers(body);

        await trailer.save()
        .then(trailer => {

            return response.status(200).json(trailer)

        }).catch(error => {
            console.log("error", error);
            return response.status(400).json({message: "Error al crear el trailer"})
        })
    };

    /**
     * @static
     * @memberof TrailersController
     * @description Actualiza la informacion de un trailer
     */
    static update = async ({ body, files }, response) => {

        let trailer = await Trailers.findOne({ _id: body.trailer_id });
        if(!trailer) return response.status(400).json({message: "Trailer no encontrado"})

        if(body.trailer_number != undefined) trailer.trailer_number = body.trailer_number;
        if(body.brand != undefined) trailer.brand = body.brand;
        if(body.model != undefined) trailer.model = body.model;
        if(body.year != undefined) trailer.year = body.year;
        if(body.vin != undefined) trailer.vin = body.vin;
        if(body.plate_number != undefined) trailer.plate_number = body.plate_number;
        if(body.plate_state != undefined) trailer.plate_state = body.plate_state;
        if(body.trailer_type != undefined) trailer.trailer_type = body.trailer_type;
        if(body.door_style != undefined) trailer.door_style = body.door_style;
        if(body.length != undefined) trailer.length = body.length;
        if(body.width != undefined) trailer.width = body.width;
        if(body.height != undefined) trailer.height = body.height;
        if(body.number_axles != undefined) trailer.number_axles = body.number_axles;
        if(body.gross_weight != undefined) trailer.gross_weight = body.gross_weight;


        trailer.save()
        .then(trailer => {
            return response.status(200).json({message: "Trailer actualizado"})
        }).catch(error => {
            return response.status(400).json({message: "Error al actualizar el trailer"})
        })
        
    };

    /**
     * @static
     * @memberof TrailersController
     * @description Obtiene un trailer especifico
     */
    static get = async ({ params, query }, response) => {

        let trailer = await Trailers.findOne({_id: params?.id})
            .lean();

        if(!trailer) return response.status(404).json({ message: 'Trailer no encontrado'})

        return response.status(200).json(trailer)
    };

    /**
     * @static
     * @memberof TrailersController
     * @description Retorna la lista de trailers del sistema
     */
    static list = async ({ query, files, user }, response) => {

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

        let trailers = await Trailers.aggregatePaginate(Trailers.aggregate(pipeline), {
            page: (body.page == undefined) ? 1 : body.page,
            limit: (body.limit == undefined) ? 10 : body.limit
        })

        return response.status(200).json(trailers);
        
    };

    /**
     * @static
     * @memberof TrailersController
     * @description Elimina un trailer de la BD
     */
    static delete = async ({ query }, response) => {

        const trailer = await Trailers.findOneAndDelete({_id: query.trailer_id})

        if(!trailer) return response.status(404).json({ message: 'Trailer no encontrado'})

        return response.status(200).json({
            message: '¡Trailer Eliminado!'
        })
    };


}

module.exports = TrailersController;
