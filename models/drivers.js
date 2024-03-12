const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2')

const Drivers = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
    },
    telefono: {
        type: String,
    },
    email: {
        type: String,
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


    //EMPLEADO
    num_empleado:{
    	type: String
    },
    driver_ops:{
    	type: String
    },
    status:{
    	type: Number
    },
    driver_type:{
    	type: Number
    },
    fecha_contratacion:{
    	type: Date
    },
    num_licencia:{
    	type: String
    },
    num_visa_us:{
    	type: String
    },
    num_pasaporte:{
    	type: String
    },
    num_fast_card:{
    	type: String
    },


}, { timestamps: true })

Drivers.plugin(mongoosePaginate);
Drivers.plugin(mongoosePaginateAggregate)

let DriversModel = mongoose.model('drivers', Drivers)
DriversModel.aggregatePaginate.options = {
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


module.exports = mongoose.model('drivers', Drivers);