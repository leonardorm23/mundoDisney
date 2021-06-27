let Pelicula = require("../models/pelicula");

const registrarPelicula = (req, res) => {
    let params = req.body;
    let pelicula = new Pelicula();

    pelicula.imagen = params.imagen;
    pelicula.titulo = params.nombre;
    pelicula.fecha_creacion = params.edad;
    pelicula.calificacion = params.peso;
    pelicula.personajes = params.historia;
    
    pelicula.save((err, savepelicula) => {
        if (err) {
            res.status(500).send({mensaje: "error al conectar servidor"});
        } else {
            if (savepelicula) {
                res.status(200).send({pelicula: savepelicula});
            } else {
                res.status(401).send({mensaje: "no se pudo registrar pelicula"});
            }
        }
    });
};

const buscarPelicula = (req, res) => {
    let id = req.params["id"];

    Pelicula.findById({_id: id}, (err, dataPelicula) => {
        if (err) {
            res.status(500).send({mensaje: "Error al conectar servidor"});
        } else {
            if (dataPelicula) {
                res.status(200).send({pelicula: dataPelicula});
            } else {
                res.status(401).send({mensaje: "no se pudo registrar pelicula"});
            }
        }
    });
};

const listaPelicula = (req, res) => {
    // si tenemos filtro nombre lo guardamos
    let nombre = req.params["nombre"];
    // Busqueda de las categorias
    Pelicula.find({ nombre: new RegExp(nombre, "i") }, (err, dataPelicula) => {
      // si hay error al conectar con mongo
      if (err) {
        res.status(500).send({ mensaje: "Error al conectar al servidor" });
      } else {
        if (dataPelicula) {
          res.status(200).send({ pelicula: dataPelicula });
        } else {
          res.status(401).send({ mensaje: "No hay categorias" });
        }
      }
    });
  };

const editarPelicula = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Pelicula.findByIdAndUpdate({_id: id}, {titulo: params.titulo, fecha_creacion: params.fecha_creacion, calificacion: params.calificacion, personajes: params.personajes},(err, dataPelicula) =>{
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
            if (dataPelicula) {
              res.status(200).send({ pelicula: dataPelicula });
            } else {
              res.status(401).send({ mensaje: "No se pudo actualizar Pelicula" });
            }
          }
    } );
};

const eliminarPelicula = (req, res) => {
    let id = req.params["id"];
    Pelicula.findByIdAndRemove({_id: id}, (err, dataPelicula) => {
        if (err) {
            res.status(500).send({ mensaje: "Error al conectar al servidor" });
          } else {
            if (dataPelicula) {
              res.status(200).send({ pelicula: dataPelicula });
            } else {
              res.status(401).send({ mensaje: "No se pudo eliminar Pelicula" });
            }
          }
    });
};

module.exports = {
    registrarPelicula,
    buscarPelicula,
    listaPelicula,
    editarPelicula,
    eliminarPelicula
}