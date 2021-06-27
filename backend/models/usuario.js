let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let usuarioSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    pass: String,
    fechaRegistro: { type: Date, default: Date.now}
});

module.exports = mongoose.model("Usuario", usuarioSchema);