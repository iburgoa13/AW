"use strict"
let abierto = true;
function cambiarCandado(){
    abierto = !abierto;
    if(abierto){
        $("#candado").prop("src","candadoAbierto.png");
    }
    else{
        $("#candado").prop("src","candadoCerrado.png");
    }
}
function mostrarInfo(){
    let edad = $("#campoEdad").prop("value"); //saca el valor del texto
    let fumador = $("#campoFumador").prop("checked"); //saca true false del chequeado
    alert(`Tienes ${edad} años y ${fumador ? '': 'no'} eres fumador`);
}
function cambiarClase(){
    $("h4").eq(0).prop("class","clase-prop");
}

$(function(){


   /* 
    $("p").on("mouseenter",function(){
         alert("Raton dentro del parrafo");
    });*/

   
    $("#botonAbrirCerrar").on("click",cambiarCandado);
    $("#botonComprobarFormulario").on("click",mostrarInfo);
    $("#cambioClase").on("click",cambiarClase);
    let cabecera = $("h1");
    cabecera.on("click",function(){
        cabecera.toggleClass("rojo");
    });
    
});