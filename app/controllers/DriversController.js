
//MODELOS
const Drivers = require('../../models/drivers');

/**
 * @class DriversController
 * @description Controlador 
 */
class DriversController {


    /**
     * @static
     * @memberof DriversController
     * @description Añade un nuevo conductor al sistema
     */
    static add = async ({ body, files }, response) => {
        console.log("body", body);

        let driver = new Drivers(body);

        await driver.save()
        .then(driver => {
            return response.status(200).json(driver)
        }).catch(error => {
            console.log("error", error);
            return response.status(400).json({message: "Error al crear el driver"})
        })
    };

    /**
     * @static
     * @memberof DriversController
     * @description Actualiza la informacion de un nuevo
     */
    static update = async ({ body, files }, response) => {

        let driver = await Drivers.findOne({ _id: body.driver_id });
        if(!driver) return response.status(400).json({message: "Driver no encontrado"})

        if(body.nombre != undefined) driver.nombre = body.nombre;
        if(body.apellidos != undefined) driver.apellidos = body.apellidos;
        if(body.email != undefined) driver.email = body.email;
        if(body.telefono != undefined) driver.telefono = body.telefono;

        if(body.direccion1 != undefined) driver.direccion1 = body.direccion1;
        if(body.direccion2 != undefined) driver.direccion2 = body.direccion2;
        if(body.ciudad != undefined) driver.ciudad = body.ciudad;
        if(body.estado_id != undefined) driver.estado_id = body.estado_id;
        if(body.pais_id != undefined) driver.pais_id = body.pais_id;
        if(body.codigo_postal != undefined) driver.codigo_postal = body.codigo_postal;

        if(body.num_empleado != undefined) driver.num_empleado = body.num_empleado;
        if(body.driver_ops != undefined) driver.driver_ops = body.driver_ops;
        if(body.status != undefined) driver.status = body.status;
        if(body.driver_type != undefined) driver.driver_type = body.driver_type;
        if(body.fecha_controatacion != undefined) driver.fecha_controatacion = body.fecha_controatacion;
        if(body.num_licencia != undefined) driver.num_licencia = body.num_licencia;
        if(body.num_visa_us != undefined) driver.num_visa_us = body.num_visa_us;
        if(body.num_pasaporte != undefined) driver.num_pasaporte = body.num_pasaporte;
        if(body.num_fast_card != undefined) driver.num_fast_card = body.num_fast_card;


        driver.save()
        .then(driver => {
            return response.status(200).json({message: "Driver actualizado"})
        }).catch(error => {
            return response.status(400).json({message: "Error al actualizar el driver"})
        })
        
    };

    /**
     * @static
     * @memberof DriversController
     * @description Obtiene un driver especifico
     */
    static get = async ({ params, query }, response) => {

        let driver = await Drivers.findOne({_id: params?.id})
            .populate('pais_id')
            .populate('estado_id')
            .lean();

        if(!driver) return response.status(404).json({ message: 'Driver no encontrado'})

        return response.status(200).json(driver)
    };

    /**
     * @static
     * @memberof DriversController
     * @description Retorna la lista de drivers del sistema
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
                        { 'apellidos': new RegExp(buscar, "i") },
                        { 'email': new RegExp(buscar, "i") },
                        { 'telefono': new RegExp(buscar, "i") }
                    ]
                }
            })
        }

        let drivers = await Drivers.aggregatePaginate(Drivers.aggregate(pipeline), {
            page: (body.page == undefined) ? 1 : body.page,
            limit: (body.limit == undefined) ? 10 : body.limit
        })

        return response.status(200).json(drivers);
        
    };

    /**
     *
     *
     * @static
     * @memberof DriversController
     * @description Elimina un driver de la BD
     */
    static delete = async ({ query }, response) => {

        const driver = await Drivers.findOneAndDelete({_id: query.driver_id})

        if(!driver) return response.status(404).json({ message: 'Driver no encontrado'})

        return response.status(200).json({
            message: '¡Driver Eliminado!'
        })
    };


}

module.exports = DriversController;
