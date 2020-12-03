"use strict"

const path = require("path");
const express = require("express");
const app = express();

var usuarios = ["Javier Montoro","Nerea Soles","Marta Locuela"];

app.get("/", function(request, response) {
    response.status(200);
    response.sendFile(path.join(__dirname,"public","bienvenido.html"));
    });
app.get("/usuarios.html", function(request, response) {
        response.redirect("/users.html");
        });
app.get("/users.html", function(request, response) {
    response.status(200);
    response.type("text/plain; charset=utf-8");
    response.end("Aqui van los usuarios");
    });
   
        
 app.listen(3000, function(err) {
    if (err) {
    console.error("No se pudo inicializar el servidor: "
    + err.message);
    } else {
    console.log("Servidor arrancado en el puerto 3000");
    }
    });
    