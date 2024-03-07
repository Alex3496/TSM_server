const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2')

const Schema = mongoose.Schema;

const Trailers = new Schema({

    usuario_padre_id:{ //creador del trailer
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },

    trailer_number: {
        type: String,
        unique: true
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    vin: {
        type: String,
        unique: true
    },
    plate_number: {
        type: String,
        unique: true
    },
    plate_state: {
        type: String,
    },
    trailer_type: {
        type: String,
    },
    door_style: {
        type: String,
    },
    length: {
        type: Number,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    number_axles: {
        type: Number,
    },
    gross_weight: {
        type: Number,
    }
}, {
    timestamps: true
})



Trailers.plugin(mongoosePaginate);
Trailers.plugin(mongoosePaginateAggregate)

let TrailersModel = mongoose.model('trailes', Trailers)
TrailersModel.aggregatePaginate.options = {
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


module.exports = mongoose.model('trailes', Trailers);