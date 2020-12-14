"use strict"
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const ficherosEst = path.join(__dirname,"public");
app.use(morgan("dev"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(ficherosEstnodeno));
app.get("/public/css/form_get.css",function(request,response){
    response.sendFile(path.join(__dirname,"public","css","form_get.css"));
});
app.get("/procesar_get", function (request, response) {
    let sexoStr = "No especificado";
    switch (request.query.sexo) {
        case "H": sexoStr = "Hombre"; break;
        case "M": sexoStr = "Mujer"; break;
    }
    response.render("infoForm", {
        nombre: request.query.nombre,
        edad: request.query.edad,
        sexo: sexoStr,
        fumador: (request.query.fumador === "ON" ? "Sí" : "No")
    });
});

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});