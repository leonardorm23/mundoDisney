let Genero = require("../models/genero");
let fs = require("fs");
let path = require ("path");
let moment = require("moment");

const registrarGenero = (req, res) => {
    let params = req.body;
    let genero = new Genero();
    let imagenPath = req.files.imagen.path;
    let nameImg = moment().unix();
    var rutaServer = "./upload/img/" + nameImg + path.extname(imagenPath).toLowerCase();
    fs.createReadStream(imagenPath).pipe(fs.createWriteStream(rutaServer));
    let bdImg = nameImg + path.extname(imagenPath).toLowerCase();
    genero.imagen = bdImg;
    genero.nombre = params.nombre;
    genero.pelicula = params.pelicula;
    genero.save((err, saveGenero) => {
        if (err) {
            res.status(500).send({mensaje: "error al conectar servidor"});
        } else {
            if (saveGenero) {
                res.status(200).send({genero: saveGenero});
            } else {
                res.status(401).send({mensaje: "no se pudo registrar Genero"});
            }
        }
    });
};

const buscarGenero = (req, res) => {
    let id = req.params["id"];

    Genero.findById({_id: id}, (err, dataGenero) => {
        if (err) {
            res.status(500).send({mensaje: "Error al conectar servidor"});
        } else {
            if (dataGenero) {
                res.status(200).send({genero: dataGenero});
            } else {
                res.status(401).send({mensaje: "no se pudo registrar Genero"});
            }
        }
    });
};

const listaGenero = (req, res) => {
    // si tenemos filtro nombre lo guardamos
    let nombre = req.params["nombre"];
    // Busqueda de las categorias
    Genero.find({ nombre: new RegExp(nombre, "i") }, (err, dataGenero) => {
      // si hay error al conectar con mongo
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (dataGenero) {
          res.status(200).send({ genero: dataGenero });
        } else {
          res.status(401).send({ mensaje: "No hay categorias" });
        }
      }
    });
  };

const editarGenero = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Genero.findByIdAndUpdate({_id: id}, {nombre: params.nombre, pelicula: params.pelicula, },(err, dataGenero) =>{
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
            if (dataGenero) {
              res.status(200).send({ genero: dataGenero });
            } else {
              res.status(401).send({ mensaje: "No se pudo actualizar Pelicula" });
            }
          }
    } );
};

const eliminarGenero = (req, res) => {
    let id = req.params["id"];
    Genero.findByIdAndRemove({_id: id}, (err, dataGenero) => {
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
            if (dataGenero) {
              res.status(200).send({ genero: dataGenero });
            } else {
              res.status(401).send({ mensaje: "No se pudo eliminar Genero" });
            }
          }
    });
};

module.exports = {
    registrarGenero,
    buscarGenero,
    listaGenero,
    editarGenero,
    eliminarGenero
}