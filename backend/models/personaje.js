let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let personajeSchema = Schema({
    imagen: String,
    nombre: String,
    edad: String,
    Peso: String,
    historia: String,
    peliculas: String,
});

module.exports = mongoose.model("personaje", personajeSchema);