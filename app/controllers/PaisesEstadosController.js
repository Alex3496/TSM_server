const Paises = require('../../models/paises');
const Estados = require('../../models/estados')



/**
 * @class PaisesEstadosController
 * @description Clase que se encarga de los paises y estados
 */
module.exports = class PaisesEstadosController {
    

    /**
     *
     *
     * @method paises 
     * @description Listado de paises
     */
    paises =  async ({ query }, response) => {

        //query de busqueda

        console.log("query", query)
        let $or = [
            {continente_en: /South America/},
            {continente_en: /North America/},
            {continente_en: /Oceania/},
            {continente_en: /Europe/},
        ]

        let $and = []

        if (query.search) {
            let buscar = (query.search == undefined) ? '.*' : query.search + '.*'

            $and.push({
                nombre: new RegExp(buscar, "i"),
            })
        }


        let sort = {}

        if (query.locale && query.locale.includes("es"))
            sort['nombre_es'] = 1
        else
            sort['nombre_en'] = 1

        console.log("{ $or, $and}", { $or, $and});

        let filter = {
            $or
        }

        if($and.length > 0){
            filter['$and'] = $and
        }

        let pais = await Paises.findOne({nombre: "Mexico"})

        Paises.find(filter)
            .sort({ nombre: 1 })
            .then(paises => response.json({data: paises,  default: pais}))
            .catch(paises => response.status(400).json({
                success: false,
                message: "No es posible obtener la lista de paises"
            }))

    }

    /**
     *
     *
     * @method estados
     * @description Listado de estados
     */
    estados = ({ query }, response) => {
        let buscar = (query.search == undefined) ? '.*' : query.search + '.*'

        let filter = {
            $or: [
                {
                    nombre: new RegExp(buscar, "i")
                },

            ]
        };

        console.log('query pais',query)

        if (query.pais_id)
            filter.pais_id = query.pais_id
        
        Estados.find(filter)
            .then(paises => response.send({
                success: true,
                message: "Lista de paises",
                data: paises
            }))
            .catch(paises => response.status(400).send({
                success: false,
                message: "No es posible obtener la lista de estados"
            }))
    }


    /**
     * @static
     * @memberof PaisesController
     * @description Lista los paises registrados
     */
    get = async ({ query }, response) => {

        let body = query

        let pais = await Paises.findOne({ codigo_2: body.codigo })

        return response.status(200).json(pais)
    };


}