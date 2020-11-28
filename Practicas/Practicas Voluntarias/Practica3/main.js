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
let daoTask = new DAOTasks(pool);


/*

daoTask.getAllTasks("daniela@ucm.es",function(err,res){
    if(err){
        console.log(err.message);
    }
    else{
        if(res)
            console.log(res);
        else console.log("Usuario no posee tags");
    }
});
*/
/*
let task = {
    "text": "Insercion ",
    "done": 0,
    "tags":["AW","PRUEBA","AMONOS"]
};
daoTask.insertTask("danielas@ucm.es",task,function(err,res){
    if(err){
        console.log("No se han insertado los datos");
    }
    else{
        console.log("Insercion completada");
    }
});
*/
/*
daoTask.deleteCompleted("daniela@ucm.es",function(err){
    if(err){
        console.log(err.message);
    }
    else console.log("Tarea/s eliminada/s correctamente");
})
*/
/*
daoTask.markTaskDone(9,function(err){
    if(err){
        console.log("No se ha marcado la tarea como completada");
    }
    else console.log("Tarea completada");
});
*/
/*
daoUser.isUserCorrect("daniela@ucm.es","1234",function(err,exist){
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
daoUser.getUserImageName("daniela@ucm.es",function(err,result){
    if(err){
        console.log(err.message);
    }
    else{  
            console.log(`La imagen es: ${result}`);
    }
});

*/