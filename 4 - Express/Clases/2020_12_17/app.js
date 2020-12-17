
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express");
const session = require("express-session");
const app = express();
app.use(morgan("dev"))
app.use(cookieParser());
const middlewareSession = session({
    saveUninitialized: false,
    secret:"foobar",
    resave: false
});
app.use(middlewareSession);
app.get("/reset", function(request, response) {
    response.status(200);
    request.session.contador = 0;
    response.type("text/plain");
    response.end("Has reiniciado el contador");
});

app.get("/increment", function(request, response) {
    if (request.session.contador === undefined) {
        response.redirect("/reset");
    }
    else {
        let contador = Number(request.session.contador) + 1;
        request.session.contador++;
        response.status(200);
        response.type("text/plain");
        response.end(`El valor actual del contador es ${contador}`);
    }
});

app.listen(3000, function(err) {
    if (err) {
    console.error("No se pudo inicializar el servidor: "
    + err.message);
    } else {
    console.log("Servidor arrancado en el puerto 3000");
    }
    });