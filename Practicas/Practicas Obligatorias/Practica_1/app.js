"use strict"
const config = require("./config");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
var multer = require('multer');
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = require("express-mysql-session");
const e = require("express");
const MYSQLStore = mysqlSession(session);
const sessionStore = MySQLStore(config.mysqlConfig);

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

const app = express();

const routerUsuarios= require("./routers/routerUsuario");
const routerQuestions= require("./routers/routerQuestion");
const routerIndex= require("./routers/index");

const { allowedNodeEnvironmentFlags } = require("process");

//estaticos
const ficherosEst = path.join(__dirname, "public");
app.use(middlewareSession);
app.use(express.static(ficherosEst));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // support json encoded bodies


app.use('/usuarios',routerUsuarios)
app.use('/questions',routerQuestions)
app.use('/',routerIndex)

// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});
