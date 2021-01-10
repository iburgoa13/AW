const userController = require("../controllers/controllerUsuario");

const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", userController.loginGet);

module.exports= indexRouter;