/*
Grupo 3
Miembros : Daniela Nicoleta Boldureanu
           Iker Burgoa Muñoz
*/ 


"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);

//let daoTask = new DAOTasks(pool);
let tags = ["AW","PORDIOS","AMONOS","UNAMAS"];
/*
tags.forEach(element => {
    console.log(element);
});*/

daoUser.numberQuestionVote(16,1,8,1,function(err,exist){
    if(err){
        console.log(err.message);
    }
    else{
        if(exist){
            console.log("HAS VOTADO");
        }
    }
});
/*
daoUser.insertQuestion("TITULO DE PRUEBA CON TAGS","ESTO ES UNA PRUEBA PARA VER SI FUNCIONA 2",tags,1, function(err,exist){
    if(err){
        console.log(err.message);
    }
    else{
        if(exist){
            console.log("Inserciones hechas");
        }
    }
});*/

/*
daoUser.insertUser("pruesbsa@prueba.com","65s4321","LIBROFUERTE_88","deiudhefuerhfnfu",function(err,exist){
    if(err){
        console.log(err.message);
    }
    else{
        if(exist){
            console.log("Usuario insertado con éxito");
        }
    }
});
*/
/*
daoUser.getUser("usuario2@prueba.com",function(err,usuarios){
    if(err){
        console.log(err.message);
    }
    else{
        console.log(usuarios);
    }
});*/
/*
daoUser.getAllUsers(function(err,usuarios){
    if(err){
        console.log(err.message);
    }
    if(usuarios.length>0){
            
        console.log(usuarios.filter(el=> el!= ''));
    }
  
});*/
/*
daoUser.isUserCorrect("usuario@prueba.com","123456",function(err,exist){
    if(err){
        console.log(err.message);
    }
    else{
        if(exist){
            console.log("Usuario y contraseña correctos.");
        }
        else{
            console.log("Usuario y/o contraseña incorrectos");
        }
    }
});
*/
/*
daoUser.getUserImageName("usuario@ucm.es",function(err,result){
    if(err){
        console.log(err.message);
    }
    else{  
            console.log(`La imagen es: ${result}`);
    }
});


daoTask.getAllTasks("usuario@ucm.es",function(err,res){
    if(err){
        console.log(err.message);
    }
    else{
        if(res){
            
            console.log(res.filter(el=> el!= ''));
        }
        else 
            console.log("El usuario no posee tareas");
    }
});


let task = {
    "text": "Insercion",
    "done": 0,
    "tags":["AW","PRUEBA","AMONOS"]
};


daoTask.insertTask("usuario@ucm.es",task,function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Insercion completada correctamente");
    }
});


daoTask.markTaskDone(1,function(err){
    if(err){
        console.log(err.message);
    }
    else console.log("Tarea completada");
});


daoTask.deleteCompleted("usuario@ucm.es",function(err){
    if(err){
        console.log(err.message);
    }
    else console.log("Tarea/s eliminada/s correctamente");
})


*/

