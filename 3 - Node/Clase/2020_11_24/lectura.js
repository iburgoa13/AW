"use strict"

const fs = require("fs");

try{
    const contenido = fs.readFileSync("fichero.txt",{encoding:"utf-8"});

    console.log("Fichero leido correctamente");
    console.log(contenido);
}
catch(err){
    console.log("Se ha producido un error:");
    console.log(err.message);
}
/**BLOQUEAN LA OPERACION y lanzan error, devuelve el estado del contenido */