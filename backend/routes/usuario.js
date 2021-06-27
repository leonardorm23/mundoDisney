let express = require("express");
let Usuario = require("../controllers/usuario");

let api = express.Router();

api.post("/auth/register", Usuario.registrarUsuario);
api.post("/auth/login", Usuario.login);

module.exports = api;
