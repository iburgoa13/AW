"use strict"

const underscore = require("underscore");

let o = {};
console.log(underscore.isEmpty(o));
console.log(underscore.isEqual(3));
console.log(underscore.isObject(o));

/**
 * npm init --> crea nuevo proyecto y el package.json
 * npm install xxx --save (para guardar las dependencias en package.json)
 *                          se crea un fichero nuevo package-lock.json y si no existe
 *                          el repo node_modules , lo crea (mirar bien esto, tenerlo lo mas alto posible del arbol para que todos lo ejecuten de ahi)
 * 
 * 
 * mocha --> paquete de test (instalarlo)
 * nodemon --> interesante instalar ejecuta fichero y se queda pendiente, cada modificacion del fichero ejecuta el fichero siempre
 */