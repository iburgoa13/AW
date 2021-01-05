const userController = require("../controllers/controllerUsuario");
const path = require("path");

const express = require("express");
var multer = require('multer');
const bodyParser = require("body-parser");
const fs = require("fs");
//const session = require("express-session");
//const mysqlSession = require("express-mysql-session");
//const MySQLStore = require("express-mysql-session");
//const e = require("express");
//const MYSQLStore = mysqlSession(session);
//const sessionStore = MySQLStore(config.mysqlConfig);
//const mysql = require("mysql");

const userRouter = express.Router();
const ficherosEst = path.join(__dirname, "public");

userRouter.use(express.static(ficherosEst));
userRouter.use(bodyParser.urlencoded({ extended: false }));
userRouter.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profile_imgs/')
    }, filename: function (req, file, cb) {
        let ext = '';
        if (file.originalname.split(".").length > 1)
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext);
    }
})

var upload = multer({ storage: storage });



/*login */
userRouter.get("/login", userController.loginGet);
userRouter.post("/login",userController.loginPost);

userRouter.get("/", userController.loginGet);

userRouter.get("/home",userController.home);

userRouter.get("/formQuestion",userController.formQuestionHome);

userRouter.get("/register",userController.registerGet);

userRouter.get("usuarios/:id_user",userController.getUserId);
userRouter.get("/searchUser",userController.getFilterUser);

userRouter.get("/fotoId/:userId",userController.getUserImageNameId);

userRouter.get("/logout",userController.logout);

userRouter.post("/register",userController.register);
userRouter.get("/imagenUsuario",userController.getUserImageName);