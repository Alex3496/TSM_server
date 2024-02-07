const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2')

const Schema = mongoose.Schema;

const Clientes = new Schema({
    
    //basica
    nombre: {
        type: String
    },
    apellidos:{
        type: String
    },
    email:{
        type: String
    },
    telefono:{
        type: String
    },
    notas:{
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


    //facturacion
    billing_email:{
        type: String
    },
    billing_contact:{
        type: String
    },
    billing_phone:{
        type: String
    },
    moneda:{
        type: String,
        enum: [ 'MXN', 'USD', 'CAD' ]
    },
    credito_limite:{
        type: Number,
    },
    credito_diponible:{
        type: Number
    },
    credito_usado:{
        type: Number
    },
    // 1 - Activo
    // 2 - Inactivo
    credito_status:{
        type: Number,
        default: 2
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



Clientes.plugin(mongoosePaginate);
Clientes.plugin(mongoosePaginateAggregate)

let ClientesModel = mongoose.model('clientes', Clientes)
ClientesModel.aggregatePaginate.options = {
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


module.exports = mongoose.model('clientes', Clientes);