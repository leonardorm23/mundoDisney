let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let generoSchema = Schema({
    nombre: String,
    imagen: String,
    pelicula: String,
    
});

module.exports = mongoose.model("Genero", generoSchema);