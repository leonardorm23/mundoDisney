let Usuario = require("../models/usuario");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");

const registrarUsuario = (req, res) => {
  let params = req.body;
  let usuario = new Usuario();
  if (params.nombre && params.apellido && params.email && params.pass) {
    bcrypt.hash(params.pass, null, null, (err, hash) => {
      if (hash) {
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.email = params.email;
        usuario.pass = hash;
        usuario.save((err, saveUsuario) => {
          if (err) {
            res.status(500).send({ err: "no se registró usuario" });
          } else {
            res.status(200).send({ usuario: saveUsuario });
          }
        });
      }
    });
  } else {
    res.status(405).send({ err: "no se guardo un dato" });
  }
};


const login = (req, res) =>  {
    let params = req.body;
    Usuario.findOne({ email: params.email}, (err, dataUser) => {
        if (err) {
            res.status(500).send({mensaje: "error del servidor"});
        } else {
            if (dataUser) {
                bcrypt.compare(params.pass, dataUser.pass, (err, confirm) => {
                    if (confirm) {
                        if (params.getToken) {
                            res.status(200).send({jwt: jwt.createToken(dataUser), //user: dataUser
                            });
                        } else {
                            res.status(200).send({Usuario: dataUser, mensaje: "Sin Token"});
                        }
                    } else {
                        res.status(401).send({mensaje: "correo o pass incorrecto"});
                    }
                })
            } else {
                res.status(401).send({mensaje: "correo o pass incorrecto"});
            }
        }
    });
};

module.exports = {
  registrarUsuario,
  login,
};
