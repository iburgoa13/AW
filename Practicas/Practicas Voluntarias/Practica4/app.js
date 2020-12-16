"use strict"
const config = require("./config");
const DAOTasks = require("./DAOTasks");
const utils = require("./utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Crear un servidor Express.js
const app = express();
const correo = "usuario@ucm.es"
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);
//estaticos
const ficherosEst = path.join(__dirname,"public");
app.use(express.static(ficherosEst));
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/tasks", function(request, response){
    daoT.getAllTasks(correo,function(err,lista){
        if(err){
            console.log(err.message);
            response.status(500).end();
        }
        else{
            response.status(200).render("tasks",{taskList:lista,user:correo});
        }
    });
});


app.post("/addTask",function(request,response){
    const {text, tags} = utils.createTask(request.body.texto);
    const new_task = {text,tags,user:correo,done:0};

    daoT.insertTask(correo,new_task,function(err,eee){
        if(err){
            console.log(err.message);
            response.status(500);
            response.write(err.message);
            response.redirect("/tasks");
        }
        else{
            response.status(200);
            response.redirect("/tasks");
        }
    });
    
});

app.get("/finish/:taskId",function(request,response){
    daoT.markTaskDone(request.params.taskId,function(error){
        if(error){
            console.log(error.message);
            response.status(500).end();
        }
        else{
            response.status(200).redirect("/tasks");
        }
    });
});


app.get("/deleteCompleted",function(request,response){
    daoT.deleteCompleted(correo,function(error){
        if(error){
            console.log(error.message);
            response.status(500).end();
        }
        else{
            response.status(200).redirect("/tasks");
        }
    });
});
// Arrancar el servidor
app.listen(config.port, function(err) {
   if (err) {
       console.log("ERROR al iniciar el servidor");
   }
   else {
       console.log(`Servidor arrancado en el puerto ${config.port}`);
   }
});
