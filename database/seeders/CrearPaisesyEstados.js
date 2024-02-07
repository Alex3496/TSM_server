
const Estados = require('../../models/estados');
const Paises = require('../../models/paises');

async function seeder () {

    console.log("PAISES - ESTADOS");
    console.log('------------ ESPERE UN MOMENTO ---------- ')

    const json_paises = require('../data/paises_estados.json')


    for (const json_pais of json_paises) {

        let pais = await Paises.findOne({ $or: [
            {nombre:  { $regex: json_pais.nombre_es, $options: 'im' }},
            {nombre:  { $regex: json_pais.nombre_en, $options: 'im' }},
        ] })


        if (pais == null) {
            pais = await Paises.create({...json_pais, nombre:json_pais.nombre_en})
            await Estados.insertMany(json_pais.estados.map(estado => ({
                nombre: estado.nombre,
                pais_id: pais._id
            })))
        } else {
            await Paises.updateOne({ _id: pais._id }, {$set: json_pais})
        }



    }

    console.log('------------ HECHO ---------- ')

}

module.exports = {
    title: "Crear Paises y Estados y Nacionalidades",
    description: "",
    seeder
}