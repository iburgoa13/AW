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

 /**ejercicio2 

 function checkArguments(f) {
  if (!(f instanceof Array)) throw new Error(`${f} is not an Array`);
  for (let funct of f) {
    if (typeof funct != "function")
      throw new Error(`${func} is not a function!`);
  }
}
function sequence1(functions,x){
  checkArguments(functions);
  let x1 = x;
  for(let funct of functions){
    x1 = funct(x1);
  }
  return x1;
}

function sequence2(functions,x){
  checkArguments(functions);
  let x2 = x;
  for(let funct of functions){
    x2 = funct(x2);
    if(x2 == undefined)return undefined;
  }
  return x2;
}

function sequence3(functions,x,inverseOrder = false){
  checkArguments(functions);
  if(!inverseOrder){
    return sequence2(functions,x);
  }
  else sequence2(functions.reverse(),x);
}

let funct1 = function(x) {
  console.log("Ejecutando funcion 1");
  return x * x;
};

let funct2 = function(x) {
  console.log("Ejecutando funcion 2");
  return 3 * x;
};

let funct3 = function(x) {
  console.log("Ejecutando funcion 3");
  return x / 2;
};

console.log(sequence3([funct1, funct2, funct3], 3, true));
console.log(sequence3([x => x * x, x => x * 2, x => x / 2], 4, false));

*/
/**ejercicio 3 */