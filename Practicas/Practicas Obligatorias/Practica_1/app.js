"use strict"
const config = require("./config");
const DAOQuestion = require("./models/DAOQuestion");
const DAOUsers = require("./models/DAOUsers");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
var multer = require('multer');
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = require("express-mysql-session");
const MYSQLStore = mysqlSession(session);
const sessionStore = MySQLStore(config.mysqlConfig);

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

//creamos instancias de los DAOS
const daoQ = new DAOQuestion(pool);
const daoU = new DAOUsers(pool);

//estaticos
const ficherosEst = path.join(__dirname, "public");
app.use(middlewareSession);
app.use(express.static(ficherosEst));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


var nameUser;
function comprobarUsuario(request, response, next) {
    if (request.session.currentUser) {
        response.locals.userEmail = request.session.currentUser;
        next();
    }
    else {
        response.status(403).redirect("/login");
    }
}
function comprobarNombre(request, response, next) {
    if (request.session.currentUser) {
        daoU.getUserName(request.session.currentUser,
            function (err, nombre) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.locals.userNombre = nombre;
                    response.locals.email = request.session.currentUser;
                    next();
                }
            });

    }
    else {
        response.status(403).redirect("/login");
    }
}
app.get("/", function (request, response) {
    response.status(200).redirect("/login");
});
app.get("/home", comprobarUsuario, comprobarNombre, function (request, response) {
    let usuario = { nombre: response.locals.userNombre };
    response.status(200).render("home",
        { usuario });
});

app.get("/formular", comprobarUsuario, comprobarNombre, function (request, response) {
    let usuario = { nombre: response.locals.userNombre };
    response.status(200).render("form_question",
        { usuario });
});
app.get("/searchTag", comprobarUsuario, comprobarNombre, function (request, response) {

    daoQ.getQuestionFilterTag(request.query.tagName, function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {

            results = results.filter(el => el != '');
            let textoTag = request.query.tagName;
            let usuario = { nombre: response.locals.userNombre };

            response.render("filter_question_tag", { usuario, questions: results, textoTag });
        }
    });
});
app.get("/searchText", comprobarUsuario, comprobarNombre, function (request, response) {

    daoQ.getQuestionFilterText(request.query.texto, function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {

            results = results.filter(el => el != '');
            let texto = request.query.texto;
            let usuario = { nombre: response.locals.userNombre };

            response.render("filter_question_text", { usuario, questions: results, texto });
        }
    });
});
app.get("/login", function (request, response) {
    response.status(200).render("login", { errorMsg: null })
});

app.get("/formQuestion", function (request, response) {
    response.status(200).render("home", { errorMsg: null })
})
app.get("/register", function (request, response) {
    response.status(200).render("register", { errorMsg: null })
});
app.get("/sinRespuesta", comprobarUsuario, comprobarNombre, function (request, response) {
    daoQ.getAllQuestionNoAnswer(function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {
            results = results.filter(el => el != '');
            let usuario = { nombre: response.locals.userNombre };
            response.render("no_response_question", { usuario, questions: results });
        }
    });
});
app.get("/questions/:id_question", comprobarUsuario, comprobarNombre, function (request, response) {
    let id = request.params.id_question;

    let email = response.locals.email;
    daoQ.isVisit(id, email, function (err, res) {
        if (err) {
            response.status(500).send(err);
        }
        else {
            if (!res) { //si es false == votas
                daoQ.setQuestionVisit(id, email, function (err, r) {
                    if (err) {
                        response.status(500).send(err);
                    }
                    else {
                        daoQ.getQuestion(id, function (err, result) {
                            if (err) {
                                response.status(500).send(err);
                            }
                            else {

                                daoQ.getResponse(id, function (err, res) {
                                    if (err) {
                                        response.status(500).send(err);
                                    }
                                    else {

                                        result = result.filter(el => el != '');
                                        res = res.filter(el => el != '');
                                        let usuario = { nombre: response.locals.userNombre };
                                        response.render("information_question", { usuario, pregunta: result[0], respuestas: res });
                                    }

                                });

                            }
                        });
                    }
                });
            }
            else {
                daoQ.getQuestion(id, function (err, result) {
                    if (err) {
                        response.status(500).send(err);
                    }
                    else {

                        daoQ.getResponse(id, function (err, res) {
                            if (err) {
                                response.status(500).send(err);
                            }
                            else {

                                result = result.filter(el => el != '');
                                res = res.filter(el => el != '');
                                let usuario = { nombre: response.locals.userNombre };
                                response.render("information_question", { usuario, pregunta: result[0], respuestas: res });
                            }

                        });

                    }
                });
            }


        }
    });


});
/*
app.get("/usuarios", comprobarUsuario, comprobarNombre, function (request, response) {
    daoQ.getAllUsers(function(err, results){
        if (err) {
            response.status(500).send(err);
        }
        else{
            results = results.filter(el => el != '');
           
            var usu = [];
            for(let it of results){
              
                daoU.getTopTagUser(it.id,function(err,result){
                    if (err) {
                        response.status(500).send(err);
                    }
                    else{
                        usu[it]
                        if (!usu[it.id])
                        usu[it.id] = {
                            "id": it.id,
                            "name": it.name,
                            "imagen": it.imagen,
                            "reputation": it.reputation
                        };
                        console.log(it, result);
                      //  usu.push([{"usuario": it, "tag" :result}]); 
                        console.log(usu.length);
                    }
                  
                });
            }
            console.log(usu);
            usu.forEach(e =>{
                console.log(e.usuario);
            });
            
            let usuario = { nombre: response.locals.userNombre };
            response.render("search_users", {usuario, usuarios: usu});
        }
    });
});*/
app.get("/questions", comprobarUsuario, comprobarNombre, function (request, response) {
    daoQ.getAllQuestion(function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {
            results = results.filter(el => el != '');
            let usuario = { nombre: response.locals.userNombre };
            response.render("questions", { usuario, questions: results });
        }
    });

});

app.get("/fotoId/:userId", comprobarUsuario, function (request, response) {

    daoU.getUserImageNameId(request.params.userId, function (error, usuario) {
        if (error) {
            response.status(500);
            response.end();
        }
        else {
            if (!usuario) {
                response.status(200).sendFile(path.join(__dirname, "public", "img", "NoPerfil.png"));
            }
            else {
                response.status(200).sendFile(path.join(__dirname, "profile_imgs", usuario));
            }
        }
    });
});
app.get("/likeQuestion", comprobarUsuario, comprobarNombre, function (request, response) {
    let email = response.locals.email;
    console.log(email);
    let like = request.query.like.split("_");
    daoQ.comprobarVotoQuestion(like[1], email, function (err, res) {
        if (err) {
            console.log(err.message);
        }
        else {
            daoQ.setResponseVoteQuestion(like[0], like[1], email, function (err, res) {
                if (err) {

                    console.log(err.message);
                }
                else {
                    response.redirect(`/questions/${like[1]}`);
                }
            });
        }
    });
});

app.get("/like", comprobarUsuario, comprobarNombre, function (request, response) {

    let email = response.locals.email;

    //like == 1 dislike == 0
    let like = request.query.like.split("_");

    daoQ.comprobarVoto(email, like[1], function (err, res) {
        if (err) {
            console.log(err.message);
        }
        else {
            daoQ.setResponseVote(like[0], like[1], email, function (err, res) {
                if (err) {

                    console.log(err.message);
                }
                else {
                    response.redirect(`/questions/${like[2]}`);
                }
            });
        }
    });


});
app.post("/login", function (request, response) {
    daoU.isUserCorrect(request.body.correo, request.body.password,
        function (error, userCorrect) {
            if (error) { // error de acceso a la base de datos
                response.status(500);
                response.render("login",
                    { errorMsg: error.message });
            }
            else if (userCorrect) {

                request.session.currentUser = request.body.correo;

                response.redirect("/home");
            }
            else {
                response.status(200);
                response.render("login",
                    { errorMsg: error.message });
            }
        });
});

app.post("/formResponse", comprobarUsuario, comprobarNombre, function (request, response) {
    let id_question = request.body.id_question;
    
    let body_response = request.body.texto;
    
    let email = response.locals.email;
    console.log(email);
    daoQ.insertResponse(id_question,body_response,email,function(err,res){
        if(err){
            console.log(err.message);
            response.status(500);
            response.end();
        }
        else{
            console.log(res);
            response.status(200);
            response.redirect(`/questions/${id_question}`);
        }
    });

});
app.post("/formQuestion", comprobarUsuario, comprobarNombre, function (request, response) {

    //array de tags
    let tags = [];
    let texto = request.body.etiquetas;

    //aqui si no es indefinido 
    if (typeof texto != "undefined" && typeof texto == "string" && texto != "" && texto.length > 0) {
        //queremos recoger el tag
        tags = (texto.match(/@\w+/g) || []).map(n => n.replace("@", ""));
    }
    if (tags.length > 5) {
        response.status(500);
        response.redirect("/home");
    }
    else {

        daoQ.insertQuestion(request.body.pregunta, request.body.texto, response.locals.email, tags, function (error, usuario) {
            usuario = { nombre: response.locals.userNombre };
            if (error) {
                response.status(500);
                response.end();
                response.render("form_question",
                    { errorMsg: error.message });

            }
            else {
                response.status(200).redirect("/home");
            }
        });
    }

});


app.get("/logout", function (request, response) {
    request.session.destroy();
    response.redirect("/login");
});

app.post("/register", upload.single('imagen'), function (request, response) {
    let imagenFich = null;
    if (request.file) {

        imagenFich = request.file.filename;
    }
    daoU.insertUser(request.body.correo, request.body.password, request.body.password2,
        request.body.nombre, imagenFich, function (error, usuario) {
            if (error) {
                response.status(500);
                response.render("register",
                    { errorMsg: error.message });

            }
            else {
                request.session.currentUser = request.body.correo;
                response.status(200).redirect("/home");

            }
        });
});

app.get("/imagenUsuario", comprobarUsuario, function (request, response) {
    daoU.getUserImageName(response.locals.userEmail, function (error, usuario) {
        if (error) {
            response.status(500);
            response.end();
        }
        else {
            if (!usuario) {
                response.status(200).sendFile(path.join(__dirname, "public", "img", "NoPerfil.png"));
            }
            else {
                response.status(200).sendFile(path.join(__dirname, "profile_imgs", usuario));
            }
        }
    });
});


// Arrancar el servidor
app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});
