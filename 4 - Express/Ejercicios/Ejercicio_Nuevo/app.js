"use strict"

const bodyParser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const { response } = require("express");
const app = express();


app.use(morgan("dev"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.urlencoded({extended:false}));

let nombre = "usuario";
let password ="1234"
let usuario_identificado = false;

function identificacionRequerida(request, response, next) {
    if (usuario_identificado) {
        next();
    } 
    else {
    response.redirect("/login");
    }
}

app.get("secreto", function(request,response,next){
    if (usuario_identificado) {
        response.redirect("/secreto");
    } 
});

app.get("otro_secreto", function(request,response,next){
    if (usuario_identificado) {
        response.redirect("/otro_secreto");
    } 

});
app.get("/", function(request, response) {

    response.redirect("/login");
  
});

app.get("/login", function(request, response){
    response.render("login");
});
app.post("/login", function(request,response){
    if((request.body.nombre === nombre) && request.body.password === password){
        usuario_identificado = true;
        response.redirect("/inicio");
    }
    else{
        usuario_identificado = false;
        response.redirect("/login");
    }
});
app.get("/inicio", function(request, response){
    response.render("inicio");
});
app.get("/secreto", function(request, response){
    response.render("secreto");
});
app.get("/otro_secreto", function(request, response){
    response.render("otro_secreto");
});
app.get("/publico", function(request, response){
    response.render("publico");
});



app.listen(3000, (err) => {
    if(err) console.log(err.message);
    else console.log("Escuchando en el puerto 3000");
});
