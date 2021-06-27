let jwt = require("jwt-simple");
let moment = require("moment");

let secret = "mundoDisney";

exports.createToken = (usuario) => {
    let payload = {
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        iat: moment().unix(),
    };
    return jwt.encode(payload,secret);
};

