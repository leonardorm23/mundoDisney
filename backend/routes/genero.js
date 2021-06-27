let express = require("express");
let Genero= require("../controllers/genero");
let multiparty = require("connect-multiparty");

let path = multiparty({carga: "./upload/img"})
let api = express.Router();

api.post("/gender/register", path, Genero.registrarGenero);
api.get("/gender/:id", Genero.buscarGenero);
api.get("/gender/:nombre?", Genero.listaGenero);
api.post("/gender/:nombre?", Genero.listaGenero);
api.put("/gender/edit/:id", Genero.editarGenero);
api.delete("/gender/delete/:id", Genero.eliminarGenero);

module.exports = api;