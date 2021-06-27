//Variables de modulos
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");


//variable puerto de conexión del servidor
let port = process.env.PORT || 3001;
let urlConnect = "mongodb+srv://leonardorm23:1234@disney.aoh9s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//variable de la aplicación que ejecuta el server
let app = express();

//Routes

let usuarioRoutes = require("./routes/usuario");
let personajeRoutes = require("./routes/personaje");
let peliculaRoutes = require("./routes/pelicula");
let generoRoutes = require("./routes/genero");

//Conexión a DB
mongoose.connect(
    urlConnect,
    {useNewUrlParser:true, useUnifiedTopology: true },
        (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log("Servidor DB: ON");
            app.listen(port, function(){
                console.log("servidor Backend Funcionando en el puerto: " + port);
            });
        }
    }
);

mongoose.connection.on('connected', () => {
    console.log("mongo atlas");
  });


//Codificación de URL
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Usar Routes
app.use("/api",usuarioRoutes);
app.use("/api", personajeRoutes);
app.use("/api", peliculaRoutes);
app.use("/api", generoRoutes);

//Modulo para exportar
module.exports = app;