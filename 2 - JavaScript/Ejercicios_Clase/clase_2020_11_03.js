"USE STRICT";
/** de un array de string devuelve un array con la longitudes
function mapLengths(x){
    let dev = [];
    if(x instanceof Array){
        for(let v of x){
            dev.push(v.length);
        }
    }
    return dev;
}
console.log(mapLengths(["hola","prueba","sionoloco"]));
*/
/**Devuelve un array y un valor que devuelve un array con los elementos superiores */
/*
function filterSup(array, x){
    let valor = [];
    if(array instanceof Array){
        for(let ind of array){
            if(x < ind){
                valor.push(ind);
            }
        }
    }
    else return "no hay array";
   return valor;
}
console.log(filterSup(["2",3,4,5,"6"],1));
*/
/**comprueba si son funciones todos */
/*
function everyFunction(array) {
    if(array instanceof Array){
        for(let funct of array){
            if(!(funct instanceof Function)) return false;
        }
    }
    else "no es un array";
    return true;
}
*/
/*
function someUndefined(array) {
    if(array instanceof Array){
        for(let und of array){
            if(und === undefined) return true;
        }
    }
    else return "no es un array";
    return false;
}
*/
/*
function reduceSquare(array) {
    if(array instanceof Array){
        let total = 0;
        for(let i of array){
            total+= i*i;
        }
        return total;
    }
    return false;
}
console.log(reduceSquare([1,2,3]));
*/


/*funciones orden superior */
/*usando MAP */
/*
function mapLengths2(array){
    if(array instanceof Array){
       return array.map(n=> n.length )
    }
}
console.log(mapLengths2(["hola","j","prueba","sionoloco"]));
*/
/*
function filterSup2(array,x){
    return array.filter(n=> n > x);
}
console.log(filterSup2(["2",3,4,5,"6"],1));
*/
/*
function everyFunction2(array){
    return array.every(n => typeof(n) == "function");
}
console.log(everyFunction2([2,1,2]));
*/
/*
function someUndefined2(array){
    return array.some( n => typeof(n) == 'undefined');
}
console.log(someUndefined2([2,undefined,2]));
*/

function reduceSquare2(array) {
    return array.reduce((ac, n) => ac + n*n, 0) ;
}
console.log(reduceSquare2([1,2,3]));