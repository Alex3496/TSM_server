const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2')

const Schema = mongoose.Schema;

const Cuentas = new Schema({
    
    //basica
    nombre: {
        type: String
    },
    terminacion:{
        type: String
    },
    banco:{
        type: String
    },
    color:{
    	type: String
    },
    imagen: {
    	type: String
    },
    /**
     * 1 - Debito
     * 2 - Credito
     * */
    tipo:{
    	type: Number
    },
    saldo:{
        type: Number
    },
    limite:{
    	type: Number
    }
   

}, {
    timestamps: true
})



Cuentas.plugin(mongoosePaginate);
Cuentas.plugin(mongoosePaginateAggregate)

let ClientesModel = mongoose.model('cuentas', Cuentas)
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