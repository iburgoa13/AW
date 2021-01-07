const questionController = require("../controllers/controllerQuestion");
const userController = require("../controllers/controllerUsuario");
const express = require("express");
const bodyParser = require("body-parser");
const questionRouter = express.Router();

questionRouter.use(bodyParser.json())
questionRouter.use(bodyParser.urlencoded({ extended: false }));

questionRouter.get("/formular",userController.comprobarUsuario,questionController.formular);
questionRouter.get("/searchTag",userController.comprobarUsuario,questionController.getQuestionFilterTag);

questionRouter.get("/searchText",userController.comprobarUsuario,questionController.getQuestionFilterText);

questionRouter.get("/sinRespuesta",userController.comprobarUsuario,questionController.getAllQuestionNoAnswer);

questionRouter.get("/questions/:id_question",userController.comprobarUsuario,questionController.getQuestionID);

questionRouter.get("/questions",userController.comprobarUsuario,questionController.getAllQuestion);

questionRouter.get("/likeQuestion",userController.comprobarUsuario,questionController.likeQuestion);

questionRouter.get("/like",userController.comprobarUsuario,questionController.like);
questionRouter.post("/formResponse",userController.comprobarUsuario,questionController.insertResponse);

questionRouter.post("/formQuestion",userController.comprobarUsuario,questionController.insertQuestion);


module.exports= questionRouter;