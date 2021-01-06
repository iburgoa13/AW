const questionController = require("../controllers/controllerQuestion");
const userController = require("../controllers/controllerUsuario");
const path = require("path");

const express = require("express");
var multer = require('multer');
const bodyParser = require("body-parser");
const fs = require("fs");
const mysqlSession = require("express-mysql-session");
const MySQLStore = require("express-mysql-session");
const mysql = require("mysql");

const questionRouter = express.Router();

// parse application/json
questionRouter.use(bodyParser.json())

questionRouter.use(bodyParser.urlencoded({ extended: false }));


/*login */
questionRouter.get("/formular",userController.comprobarUsuario,questionController.formular);
questionRouter.get("/searchTag",userController.comprobarUsuario,questionController.getQuestionFilterTag);

questionRouter.get("/searchText",userController.comprobarUsuario,questionController.getQuestionFilterText);

questionRouter.get("/sinRespuesta",userController.comprobarUsuario,questionController.getAllQuestionNoAnswer);

questionRouter.get("/questions/:id_question",userController.comprobarUsuario,questionController.getQuestionID);

questionRouter.get("/questions",userController.comprobarUsuario,questionController.getAllQuestion);

questionRouter.get("/likeQuestion",userController.comprobarUsuario,questionController.likeQuestion);

questionRouter.get("/like",userController.comprobarUsuario,questionController.like);
questionRouter.post("/formResponse",userController.comprobarUsuario,questionController.insertQuestion);

questionRouter.post("/formQuestion",userController.comprobarUsuario,questionController.insertQuestion);


module.exports= questionRouter;