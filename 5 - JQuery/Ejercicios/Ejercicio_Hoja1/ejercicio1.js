"use strict"

let m = [
    ["Esto","es","una fila"],
    ["aqui","va","otra fila"],
    ["y","aqui","otra mas"]
]
function insertMatriz(selector, matriz){
    let tabla = $("<table></table>");
    matriz.forEach(element => {
        let fila = $("<tr></tr>");
        element.forEach(e =>
        {
            fila.append(`<td>${e}</td>`);
        });
    tabla.append(fila);
    });
    selector.append(tabla);
}

$(() =>{
    let selector = $("div.tabla");
    insertMatriz(selector,m);
});