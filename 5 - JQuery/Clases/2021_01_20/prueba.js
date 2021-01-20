"use strict"
//movimiento del raton
/*
$(function() {
    $("#superficie").on("mouseenter", function() {
        $("#posicion").show();
    });

    $("#superficie").on("mouseleave", function() {
        $("#posicion").hide();
    });

    $("#superficie").on("mousemove", function(event) {
        $("#posicion").text(`${event.pageX} x ${event.pageY}`);
    });
});
    */
  
    
//pulsacion de teclas
/**
 *  $(function() {
    $(document).on("keydown", function(event) {
    $(".indicador").removeClass("activo");
    $("#codigoTecla").text(event.which);
    if (event.ctrlKey) {
    $("#ctrl").addClass("activo");
    }
    if (event.metaKey) {
    $("#meta").addClass("activo");
    }
    if (event.altKey) {
    $("#alt").addClass("activo");
    }
    if (event.shiftKey) {
    $("#shift").addClass("activo");
    }
    event.preventDefault();
    });
    });
 */

  //boton delegado
  /*
$(function(){

 $("#listaElementos").on("click","li", function(event) {
    // event.target contiene un elemento del DOM
    // Construir una selección a partir de él:
    let elementoPulsado = $(event.target);
    // Mostrar mensaje con el contenido del <li>:
    alert("Has hecho clic en " + elementoPulsado.text());
    });

let contador = 3;
$("#añadir").on("click", function() {
contador++;
let newElem = $(`<li>Elemento ${contador}</li>`);
$("#listaElementos").append(newElem);
});
})
*/
/*
$(function(){
    $("body").on("click", function() {
        console.log("Se ha pulsado en el cuerpo de la página");
        });
        $("#contenedor").on("click", function() {
        console.log("Se ha pulsado en la región externa");
        });
        $("#region1").on("click", function() {
        console.log("Se ha pulsado en la región 1");
        //evita la propagacion
        event.stopPropagation();
        });
        $("#region2").on("click", function() {
        console.log("Se ha pulsado en la región 2");
        });
        
});
*/
/*
$(function(){
    $("#formulario input[type=submit]").on("click", function(event) {
        let valor = $("#formulario input[type=text]").prop("value");
        if (isNaN(Number(valor))) {
        alert("No has introducido ningún número!");
        // Inhibir el envío del formulario
        if(valor === undefined || valor === null){
            alert("No has introducido ningún número!");
        }
        event.preventDefault();
        }
        });
});
*/

$(function(){
    $("#superficie").fadeIn(2000).fadeOut(2000);
    // Mostrar y ocultar hasta el 50% de opaciodad
    $("#superficie").fadeIn(2000).fadeTo(2000, 0.5);
    // Ocultar y mostrar con deslizamiento
    $("#superficie").slideUp(2000).slideDown(2000);
    $("#superficie").show().css("position", "relative")
.animate({ top: "400px", opacity: "0" }, 2000);

});