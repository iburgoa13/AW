"use strict";
/*
EJERCICIO 1
function producto(x, y) {
 
    if (typeof x == "number" && typeof y == "number") return x * y;
   
    if(typeof x == "number" && Array.isArray(y)){
      let valor = 0;
      for(let i in y) valor += y[i] * x;
      return valor;
    }

    if(typeof y == "number" && Array.isArray(x)){
      let valor = 0;
      for(let i in x) valor += x[i] * y;
      return valor;
    }

    if(Array.isArray(x) && Array.isArray(y)){
      let valor = 0;
      if(x.length == y.length){
        for(let i in x) valor+= x[i]*y[i];
        return valor;
      }
      else{
        throw new Error("Error. Son de distinto tamaño");
      }
    }
    throw new Error("Error. Hay variables que no son numericas");
  }
  
  try {
    console.log(producto(2, 4));
    console.log(producto(2, [2, 4, 6]));
    console.log(producto([3, 6, 9], 3));
    console.log(producto([2, 4, 6], [3, 6, 9]));
    console.log(producto("Hola mundo", 3));
    console.log(producto(3, "Hola mundo"));
    console.log(producto([1, 2, 3], "Hola"));
    console.log(producto([1, 2, 3], [1, 2, 3, 4]));
  } catch (Err) {
    console.log(Err.message);
  }
  */