"use strict"

const path = require("path");
const Express = require("express");
const app = Express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));



const usuarios = [
    {nombre: "Iker Burgoa" , numero: 123456},
    {nombre: "Morgan Freeman" , numero: 654321},
    {nombre: "Daniela" , numero: 182937},
    {nombre: "Maradona" , numero: 938271}
]



app.listen(3000, (err) => {
    if(err) console.log(err.message);
    else console.log("Escuchando en el puerto 3000");
});

app.get("/usuarios", function(request, response){
    response.redirect("/users");
});

app.get("/public/css/usuarios.css",function(request,response){
    response.sendFile(path.join(__dirname,"public","css","usuarios.css"));
});
app.get("/users", function(request, response){
    response.render("usuarios",  {users: usuarios} );
});

app.get("/socios", function(request, response) {
    response.redirect("/users");
});