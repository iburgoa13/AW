"use strict"
const os = require("os");
const util = require("util");


console.log(`Nombre del host: ${os.hostname()}`);
console.log(`Directorio personal: ${os.homedir()}`);

const mensaje = util.format("Estamos en el año %d", 2018);
console.log(mensaje);