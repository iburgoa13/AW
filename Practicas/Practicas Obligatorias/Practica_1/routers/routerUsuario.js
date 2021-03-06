const userController = require("../controllers/controllerUsuario");
const path = require("path");

const express = require("express");
var multer = require('multer');
const bodyParser = require("body-parser");
const userRouter = express.Router();

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

var multerFactory = multer({ storage: storage });
userRouter.use(bodyParser.json())
userRouter.use(bodyParser.urlencoded({ extended: false }));





/*login */
userRouter.get("/login",userController.loginGet);
userRouter.post("/login",userController.loginPost);


userRouter.get("/logout",userController.logoutU);
userRouter.get("/home", userController.comprobarUsuario,userController.home);
userRouter.get("/searchUser", userController.comprobarUsuario,userController.getFilterUser);
userRouter.get("/formQuestion", userController.comprobarUsuario,userController.formQuestionHome);

userRouter.get("/register",userController.registerGet);
userRouter.post("/register",multerFactory.single('imagen'),userController.registerPost);

userRouter.get("/", userController.comprobarUsuario,userController.getAllUsers);

userRouter.get("/:id_user", userController.comprobarUsuario,userController.getUserId);


userRouter.get("/fotoId/:userId", userController.comprobarUsuario,userController.getUserImageNameId);




userRouter.get("/imagenUsuario", userController.comprobarUsuario,userController.getUserImageName);


module.exports= userRouter;