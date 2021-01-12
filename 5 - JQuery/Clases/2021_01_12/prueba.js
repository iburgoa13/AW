"use strict"

/*
//alerta
alert("Mensaje en ventana");
*/

function saludar(){
    console.log("Hola !" + new Date().toISOString());
}
/*
//temporizador
//ejecuta la funcion cuando pasen t milisegundos
setTimeout(saludar,1000);
*/

//intervalos
//ejecuta la funcion cada t milisegundos
//el id que me devuelve se lo meto en el clearInterval
//el clearInterval sino se pone se bloquea todo
//con clearInterval quiere decir que elimine ese id pasados t milisegundos
let timerID = setInterval(saludar,1000);

setTimeout(function() {clearInterval(timerID);}, 5000);

/*---DOM---
childNodes --> tipo NodeList
firstChild --> tipo Node
lastChild --> tipo Node
nextSibling --> tipo Node
*/
//pero se usa jQuery