/*
Práctica 5
Grupo 03
Miembros: Daniela Nicoleta Boldureanu
          Iker Burgoa Muñoz 
        
*/ 


"use strict";



/*
Esta función devuelve un array con los textos de aquellas tareas de la lista de tareas tasks que no estén finalizadas.
 */
function getToDoTasks(tasks){
    //comprobacion de si es array sino devuelve vacio
    if(!(tasks instanceof Array)) return [];
    return tasks.filter(n => n["done"] !=true || n["done"] != undefined).map(m => m["text"])
}



/*
Esta función devuelve un array que contiene las tareas del array tasks que contengan, en su lista de etiquetas, la etiqueta pasada como segundo parámetro.
*/
function findByTag(tasks,tag){
    if(!(tasks instanceof Array && typeof tag == "string")) return [];
   
    return tasks.filter(n=> 
        n["tags"].indexOf(tag,0)!=-1
        );
}





/*
Esta función devuelve un array que contiene aquellas tareas del array tasks que contengan al menos una etiqueta que coincida con una de las del array tags pasado como segundo parámetro.
 */
function findByTags(tasks,tag){
    return tasks.reduce((n,task)=>{
        if(tag.some(m => task["tags"].includes(m))) n.push(task);

        return n;
    },[]);
}




/*
Esta función devuelve el número de tareas completadas en el array de tareas tasks pasado como parámetro.
 */
function countDone(tasks){
    if(!(tasks instanceof Array)) return 0;

    return tasks.reduce((n,task) => {
        if(task["done"] != undefined && task["done"]) n++;
        return n;
    },0);
}




/*
Esta función recibe un texto intercalado con etiquetas, cada una de ellas formada por una serie de caracteres alfanuméricos precedidos por el signo @. 
Esta función debe devolver un objeto tarea con su array de etiquetas extraídas de la cadena texto. Por otra parte, el atributo text de la tarea resultante 
no debe contener las etiquetas de la cadena de entrada ni espacios en blanco de más.
 */
function createTask(texto){
    //array de tags
    let tags = []; 
    //el texto
    let text = "";

    //aqui si no es indefinido 
    if(typeof texto != "undefined" && typeof texto =="string" && texto!=""){
        //queremos recoger el tag
        tags = (texto.match(/@\w+/g) || []).map(n => n.replace("@",""));
        text = texto.replace(/@\w+/g,"").trim().replace(/\s/g,' ');
    }
    return {text,tags};
}

module.exports = {
    getToDoTasks,
    findByTag,
    findByTags,
    countDone,
    createTask
  }