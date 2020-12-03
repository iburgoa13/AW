"use strict";
const path = require("path");
const express = require("express");
const app = express();
app.get("/", function(request, response) {
response.status(200);
response.type("text/plain; charset=utf-8");
response.end("Esta es la página raíz");
});
app.get("/users.html", function(request, response) {
response.status(200);
response.type("text/plain; charset=utf-8");
response.end("Aquí se mostrará la página de usuarios");
});
app.listen(3000, function(err) {
if (err) {
console.error("No se pudo inicializar el servidor: "
+ err.message);
} else {
console.log("Servidor arrancado en el puerto 3000");
}
});
