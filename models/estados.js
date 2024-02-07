const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')

const Estados = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    pais_id: {
        type: Schema.Types.ObjectId,
        ref: 'paises'
    }
}, { timestamps: true })

Estados.plugin(mongoosePaginate);

module.exports = mongoose.model('estados', Estados);