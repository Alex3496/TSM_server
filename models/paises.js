const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2')

const Paises = new Schema({

    
    nombre:{
        type: String,
        required: true,
    },
    nombre_es:{
        type: String,
        required: true,
    },
    
    nombre_en:{
        type: String,
        required: true,
    },

    continente_en:{
        type: String,
        required: true,
    },
    continente_es:{
        type: String,
        required: true,
    },

    codigo_internacional: {
        type: String,
        required: true,
    },

    codigo_2:{
        type: String,
        required: true,
    },
    codigo_3:{
        type: String,
        required: true,
    },

}, { timestamps: true })

Paises.plugin(mongoosePaginate);
Paises.plugin(mongoosePaginateAggregate);

module.exports = mongoose.model('paises', Paises);