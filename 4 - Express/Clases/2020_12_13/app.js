"use strict"

const path = require("path");
const Express = require("express");
const app = Express();
const morgan = require("morgan");
const fs = require("fs");
const ficherosEstatico = path.join(__dirname,"public");
/**morgan de los primeros */
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(morgan("dev"));
app.use(Express.static(ficherosEstatico));

let ipsCensudaradas = ["144.9.81.244","145.2.34.23"];

app.use(function(request,response,next){
    console.log(`Recibida peticion ${request.method} `
    +`en ${request.url}  de ${request.ip}`);
});

app.use(function(request,response,next){
    if(ipsCensudaradas.indexOf(request.ip)>=0){
        response.status(401);
        response.end("No autorizado");
    }
    else{
        console.log("IP autorizada");
        next();
    }
});


app.use(function(request,response,next){
    request.esUCM = request.ip.startsWith("127.0.");
    next();
});


app.listen(3000, (err) => {
    if (err) console.log(err);
    else console.log("Escuchando en el puerto 3000!");
})

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "public", "bienvenido.html"))
});

app.get("/index.html", function (request, response) {
    response.status(200);
    response.type("text/plain; enconding=utf-8");
    response.write("Hola!");
    if (request.esUCM) {
        response.write("Estás conectado desde la UCM");
    }
    response.end();
});


app.get("/usuarios",function(request,response,next){
    fs.readFile("noexiste.txt",function(err,contenido){
        if(err){
            next(err);
        }
        else{
            request.contenido = contenido;
        }
    });
});

app.use(function (request, response, next) {
    response.status(404);
    response.render("error", { url: request.url });
});


/*
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

let ipsCensudaradas = ["144.9.81.244","145.2.34.23"];

app.use(function(request,response,next){
    console.log(`Recibida peticion ${request.method} `
    +`en ${request.url}  de ${request.ip}`);
});

app.use(function(request,response,next){
    if(ipsCensudaradas.indexOf(request.ip)>=0){
        response.status(401);
        response.end("No autorizado");
    }
    else{
        console.log("IP autorizada");
        next();
    }
});


app.use(function(request,response,next){
    request.esUCM = request.ip.startsWith("127.0.");
    next();
});

app.get("/error", function(request, response){
    response.render("error404",{url: request.url});
});
app.get("/index.html",function(request,response){
    response.status(200);
    response.type("text/plain;encoding=utf-8");
    response.write("HOLA");
    if(!request.esUCM){
        response.write("Estas conectado desde la UCM");
    }
    response.end();
});

app.use(function(request,resposne,next){
    response.status(404);
    response.render("error404",{url: request.url});
});

app.listen(3000, (err) => {
    if(err) console.log(err.message);
    else console.log("Escuchando en el puerto 3000");
});*/