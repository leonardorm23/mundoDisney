let express = require("express");
let Pelicula= require("../controllers/pelicula");

let api = express.Router();

api.post("/movies/register", Pelicula.registrarPelicula);
api.get("/movies/:id", Pelicula.buscarPelicula);
api.get("/movies/:nombre?", Pelicula.listaPelicula);
api.post("/movies/:nombre?", Pelicula.listaPelicula);
api.put("/movies/edit/:id", Pelicula.editarPelicula);
api.delete("/movies/delete/:id", Pelicula.eliminarPelicula);

module.exports = api;