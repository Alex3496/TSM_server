const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2')

const Schema = mongoose.Schema;

const Locations = new Schema({
    
    //basica
    nombre: {
        type: String
    },
    nombre_contacto:{
        type: String
    },
    email_contacto:{
        type: String
    },
    telefono:{
        type: String
    },
    sites_notas:{
        type: String
    },
    internal_notas:{
        type: String
    },
    horario: [
        { type: Date }
    ],
    appointment:{
        type: Boolean,
        default: false,
    },
    location_requirement: {
        type: String
    },

    //direccion
    direccion1:{
        type: String
    },
    direccion2:{
        type: String
    },
    ciudad:{
        type: String
    },
    estado_id:{
        type: Schema.Types.ObjectId,
        ref: 'estados'
    },
    pais_id:{
        type: Schema.Types.ObjectId,
        ref: 'paises'
    },
    codigo_postal:{
        type: String
    },

    //sistema
    // 1 - Activo
    // 2 - Inactivo
    status:{
        type: Number,
        default: 1
    },
    usuario_padre_id:{ //creador del cliente
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    }

}, {
    timestamps: true
})



Locations.plugin(mongoosePaginate);
Locations.plugin(mongoosePaginateAggregate)

let LocationsModel = mongoose.model('locations', Locations)
LocationsModel.aggregatePaginate.options = {
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


module.exports = mongoose.model('locations', Locations);