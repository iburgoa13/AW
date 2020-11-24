/*"use strict"

const fs = require("fs");

//funcion callback
function ficheroLeido(err,contenido){
    if(err){
        console.log("Se ha producido un error:");
        console.log(err.message);
    }
    else{
        console.log("Mensaje leido correctamente:");
        console.log(contenido);
    }
}


fs.readFile("fichero.txt",{encoding:"utf-8"},ficheroLeido);

en consola se muestra primero este mensaje, por hilos
 * primero el hilo principal sigue acaba y lee mensaje desde principal y despues llama a ficheroleido y lee ese mensaje
 
console.log("Mensaje desde principal");
*/

"use strict";
const fs = require("fs");
fs.readFile("fichero.txt",
{ encoding: "utf-8" },
function(err, contenido) {
if (err) {
console.log("Se ha producido un error:");
console.log(err.message);
} else {
console.log("Fichero leído correctamente:");
console.log(contenido);
}
}
);

console.log("Mensaje desde principal");