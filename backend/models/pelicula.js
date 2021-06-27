let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let peliculajeSchema = Schema({
    imagen: String,
    titulo: String,
    fecha_creacion: String,
    calificacion: String,
    personajes: String,
    
});

module.exports = mongoose.model("pelicula", peliculajeSchema);