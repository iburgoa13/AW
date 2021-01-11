/*
Práctica 5
Grupo 03
Miembros: Daniela Nicoleta Boldureanu
          Iker Burgoa Muñoz 
        
*/ 


"use strict"
const config = require("./config");
const DAOTasks = require("./DAOTasks");
const DAOUsers = require("./DAOUsers");
const utils = require("./utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = require("express-mysql-session");
const MYSQLStore = mysqlSession(session);
const sessionStore = MySQLStore(config.mysqlConfig);


const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
    });

// Crear un servidor Express.js
const app = express();
// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);
const daoU = new DAOUsers(pool);
//estaticos
const ficherosEst = path.join(__dirname,"public");
app.use(middlewareSession);
app.use(express.static(ficherosEst));
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


function comprobarUsuario(request,response,next){
    if(request.session.currentUser){
        response.locals.userEmail = request.session.currentUser;
        next();
    }
    else{
        response.status(403).redirect("/login");
    }
}


app.get("/tasks", comprobarUsuario, function(request, response){
    daoT.getAllTasks(response.locals.userEmail,function(err,lista){
        if(err){
          
            response.status(500).end(err.message);
        }
        else{
            response.status(200).render("tasks",{taskList:lista,user: response.locals.userEmail});
        }
    });
});

app.get("/",function(request,response){
    response.status(200).redirect("/login");
});

app.post("/addTask",comprobarUsuario,function(request,response){
    const {text, tags} = utils.createTask(request.body.texto);
    const new_task = {text,tags,user:response.locals.userEmail,done:0};

    daoT.insertTask(response.locals.userEmail,new_task,function(err){
        if(err){
            console.log(err.message);
            response.status(500);
            response.end(err.message);
        }
        else{
            response.status(200);
            response.redirect("/tasks");
        }
    });
    
});

app.get("/finish/:taskId",comprobarUsuario,function(request,response){
    daoT.markTaskDone(request.params.taskId,function(error){
        if(error){
            console.log(error.message);
            response.status(500).end(error.message);
        }
        else{
            response.status(200).redirect("/tasks");
        }
    });
});


app.get("/deleteCompleted",comprobarUsuario,function(request,response){
    daoT.deleteCompleted(response.locals.userEmail,function(error){
        if(error){
            console.log(error.message);
            response.status(500).end(error.message);
        }
        else{
            response.status(200).redirect("/tasks");
        }
    });
});

//PRACTICA 5
app.get("/login",function(request,response){
    response.status(200).render("login",{errorMsg: null})
});

app.post("/login",function(request,response){
    daoU.isUserCorrect(request.body.correo,request.body.password,
        function(error,userCorrect){
            if (error) 
            { // error de acceso a la base de datos
                response.status(500);
                response.render("login",
                { errorMsg:error.message });
            }
            else if (userCorrect){
                request.session.currentUser = request.body.correo;
                response.redirect("tasks");
            } 
            else 
            {
                response.status(200);
                response.render("login",
                { errorMsg:error.message });
            }
        });
});

app.get("/logout",function(request,response){
    request.session.destroy();
    response.redirect("login");
});

app.get("/imagenUsuario",comprobarUsuario,function(request,response){
    daoU.getUserImageName(response.locals.userEmail,function(error,usuario){
        if(error){
            response.status(500);
            response.end();
        }
        else{
            if(!usuario) response.status(200).sendFile(path.join(__dirname,"public","img","NoPerfil.jpg"));
            else{
                response.status(200).sendFile(path.join(__dirname,"profile_imgs",usuario));
            }
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
