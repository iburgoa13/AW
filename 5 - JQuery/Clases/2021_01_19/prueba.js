"use strict"

function actualizaEtiqueta(elem){
    let ancho = Math.round(elem.width());
    let alto = Math.round(elem.height());
    $("div.tamaño").text(`${ancho} x ${alto}`);
}

$(() =>{
    let parrafo = $("div.parrafo");
    actualizaEtiqueta(parrafo);
    // Cuando se pulsa el botón de aumentar anchura...
    $("#aumentarAnchura").on("click", function() {
    // Obtenemos la anchura actual y establecemos la nueva
    let anchoActual = parrafo.width();
    parrafo.width(anchoActual + 20);
    // Actualizamos la etiqueta con la nueva dimensión
    actualizaEtiqueta(parrafo);
    });

});