"use strict"

function areaCuadrado(lado){
    return lado*lado;
}

function areaCirculo(radio){
    return Math.PI * radio * radio;
}

function perimetroCuadrado(lado){
    return 4*lado;
}

function perimetroCirculo(radio){
    return 2* Math.PI* radio;
}

module.exports = {
    areaCuadrado: areaCuadrado,
    areaCirculo : areaCirculo,
    perimetroCirculo: perimetroCirculo,
    perimetroCuadrado: perimetroCuadrado
}