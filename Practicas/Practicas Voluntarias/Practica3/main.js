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


daoUser.isUserCorrect("usuario@ucm.es","mipass",function(err,exist){
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
        if(res.length>0)
            console.log(res);
        else console.log("Usuario no posee tareas");
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





