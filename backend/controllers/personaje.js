let Personaje = require("../models/personaje");

const registrarPersonaje = (req, res) => {
    let params = req.body;
    let personaje = new Personaje();

    personaje.imagen = params.imagen;
    personaje.nombre = params.nombre;
    personaje.edad = params.edad;
    personaje.peso = params.peso;
    personaje.historia = params.historia;
    personaje.peliculas = params.peliculas;
    personaje.save((err, savePersonaje) => {
        if (err) {
            res.status(500).send({mensaje: "error al conectar servidor"});
        } else {
            if (savePersonaje) {
                res.status(200).send({personaje: savePersonaje});
            } else {
                res.status(401).send({mensaje: "no se pudo registrar personaje"});
            }
        }
    });
};

const buscarPersonaje = (req, res) => {
    let id = req.params["id"];

    Personaje.findById({_id: id}, (err, dataPersonaje) => {
        if (err) {
            res.status(500).send({mensaje: "Error al conectar servidor"});
        } else {
            if (dataPersonaje) {
                res.status(200).send({personaje: dataPersonaje});
            } else {
                res.status(401).send({mensaje: "no se pudo registrar personaje"});
            }
        }
    });
};

const listaPersonaje = (req, res) => {
    // si tenemos filtro nombre lo guardamos
    let nombre = req.params["nombre"];
    // Busqueda de las categorias
    Personaje.find({ nombre: new RegExp(nombre, "i") }, (err, dataPersonaje) => {
      // si hay error al conectar con mongo
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (dataPersonaje) {
          res.status(200).send({ personaje: dataPersonaje });
        } else {
          res.status(401).send({ mensaje: "No hay categorias" });
        }
      }
    });
  };

const editarPersonaje = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Personaje.findByIdAndUpdate({_id: id}, {nombre: params.nombre, edad: params.edad, peso: params.peso, historia: params.historia},(err, dataPersonaje) =>{
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
            if (dataPersonaje) {
              res.status(200).send({ personaje: dataPersonaje });
            } else {
              res.status(401).send({ mensaje: "No se pudo actualizar personaje" });
            }
          }
    } );
};

const eliminarPersonaje = (req, res) => {
    let id = req.params["id"];
    Personaje.findByIdAndRemove({_id: id}, (err, dataPersonaje) => {
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
            if (dataPersonaje) {
              res.status(200).send({ personaje: dataPersonaje });
            } else {
              res.status(401).send({ mensaje: "No se pudo eliminar personaje" });
            }
          }
    });
};

module.exports = {
    registrarPersonaje,
    buscarPersonaje,
    listaPersonaje,
    editarPersonaje,
    eliminarPersonaje
}