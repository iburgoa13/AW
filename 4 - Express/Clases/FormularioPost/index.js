"use strict"

const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const app = express();

const ficherosEst = path.join(__dirname,"public");

app.use(morgan("dev"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(ficherosEst));

app.get("/public/css/form_post.css",function(request,response){
    response.sendFile(path.join(__dirname,"public","css","form_post.css"));
});

app.use(bodyParser.urlencoded({extended:false}));


app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});


app.post("/procesar_post",function(request,response){
    let sexoS ="No especificado";
    switch(request.body.sexo){
        case "H" : sexoS = "Hombre";break;
        case "M" : sexoS = "Mujer";break;
    }

    response.render("infoForm",{
        nombre: request.body.nombre,
        edad: request.body.edad,
        sexo: sexoS,
        fumador: (request.body.fumador ==="ON" ? "Si" :"No")
    });
});