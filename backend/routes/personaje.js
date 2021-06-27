let express = require("express");
let Personaje = require("../controllers/personaje");

let api = express.Router();

api.post("/characters/register", Personaje.registrarPersonaje);
api.get("/characters/:id", Personaje.buscarPersonaje);
api.get("/characters/:nombre?", Personaje.listaPersonaje);
api.post("/characters/:nombre?", Personaje.listaPersonaje);
api.put("/characters/edit/:id", Personaje.editarPersonaje);
api.delete("/characters/delete/:id", Personaje.eliminarPersonaje);

module.exports = api;