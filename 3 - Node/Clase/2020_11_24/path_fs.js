"use strict"
/*"use strict"
console.log("DIRECTORIO: "+__dirname);//directorio

console.log("FICHERO: "+__filename);//fichero

*/

/*
const path = require("path");
const infoFichero = path.parse(__filename);
console.log(infoFichero);
// → { root: 'H:\\',
// dir: 'H:\\UCM\\FDI\\AW\\2020-2021\\node.js\\ejercicios\\pruebas',
// base: 'ej1.js',
// ext: '.js',
// name: 'ej1' }
const nuevoFichero = path.join(infoFichero.dir, "nuevo",
infoFichero.base);
console.log(nuevoFichero);
// → H:\UCM\FDI\AW\2018-2019\*/


let fs=require('fs');
for (let i=1; i<10; i++) {
let fichero = "f" + i + ".txt";
console.log("Solicitada la escritura del fichero " + fichero);
fs.writeFile(fichero,fichero,function(err) {
if (!err) {
console.log("Terminada la escritura del fichero" + fichero);
}
})
}
