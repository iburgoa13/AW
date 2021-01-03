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
const e = require("express");
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
        daoU.getUserName(request.session.currentUser,
            function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.locals.userNombre = res.name;
                    response.locals.email = request.session.currentUser;
                    response.locals.id = res.id;
                    next();
                }
            });
           
    }
    else {
        response.status(403).redirect("/login");
    }
}
/*
function comprobarNombre(request, response, next) {
    if (request.session.currentUser) {
        daoU.getUserName(request.session.currentUser,
            function (err, res) {
                if (err) {
                    console.log(err);
                }
                else {
                    response.locals.userNombre = res.name;
                    response.locals.email = request.session.currentUser;
                    response.locals.id = res.id;
                    next();
                }
            });

    }
    else {
        response.status(403).redirect("/login");
    }
}*/
app.get("/", function (request, response) {
    response.status(200).redirect("/login");
});
app.get("/home", comprobarUsuario, function (request, response) {
    let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
    response.status(200).render("home",
        { usuario });
});

app.get("/formular", comprobarUsuario, function (request, response) {
    let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
    response.status(200).render("form_question",
        { usuario });
});
app.get("/searchTag", comprobarUsuario, function (request, response) {

    daoQ.getQuestionFilterTag(request.query.tagName, function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {

            results = results.filter(el => el != '');
            let textoTag = request.query.tagName;
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.render("filter_question_tag", { usuario, questions: results, textoTag });
        }
    });
});
app.get("/searchText", comprobarUsuario, function (request, response) {

    daoQ.getQuestionFilterText(request.query.texto, function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {

            results = results.filter(el => el != '');
            let texto = request.query.texto;
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };

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
app.get("/sinRespuesta", comprobarUsuario, function (request, response) {
    daoQ.getAllQuestionNoAnswer(function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {
            results = results.filter(el => el != '');
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.render("no_response_question", { usuario, questions: results });
        }
    });
});
app.get("/questions/:id_question", comprobarUsuario, function (request, response) {
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
                    else{
                        daoU.insertMedalQuestionVisit(id, function(err, result){
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
                                                let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
                                                response.render("information_question", { usuario, pregunta: result[0], respuestas: res });
                                            }
        
                                        });
        
                                    }
                                });
                            }
                        });
                    }
                   
                   // insertMedall primero te saque las visitas y 3 ifs ==2 4 6
                    
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
                                let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
                                response.render("information_question", { usuario, pregunta: result[0], respuestas: res });
                            }

                        });

                    }
                });
            }


        }
    });


});

app.get("/usuarios", comprobarUsuario, function (request, response) {

   
    daoU.getAllUsers(function(err, results){
        if (err) {
            response.status(500).send(err);
        }
        else{
            results = results.filter(el => el != '');
            for(let it of results){
                let arr = [];
                if(it.tags!= null)
                { 
                    arr= it.tags.split(",");
                    const tags = arr.filter((number, i) => i == 0 ? true : number[i - 1] != number);
                    const counterTags = tags.map(_tag => {
                        return {tag: _tag, count: 0};
                    });
                    
                    counterTags.map((count, i) =>{
                        const actualTagLength = arr.filter(number => number === count.tag).length;
                        count.count = actualTagLength;
                    })
                   
                    let max = 0;
                    let nombre;
                    counterTags.forEach(e =>{
                        if(max < e.count){
                            max = e.count;
                            nombre = e.tag;
                            it.tags = nombre;
                        } 
                    });
                 

                }
            }
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.status(200).render("search_users",{usuario, usuarios: results});
         
        }
    });
});
app.get("/usuarios/:id_user",comprobarUsuario, function (request, response) {
    let id = request.params.id_user;
    daoU.getInfoUser(id,function(err, result){
        if (err) {
            response.status(500).send(err);
        }
        else{
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            if(result.bronce!= null)
            { 
                let arr= result.bronce.split(",");
                console.log(arr);
                const medallas = arr.filter((number, i) => i == 0 ? true : number[i - 1] != number);
                const counterMedallas = medallas.map(_medal => {
                    return {medalla: _medal, count: 0};
                });
                console.log(medallas);

                counterMedallas.map((count, i) =>{
                    const actualTagLength = arr.filter(number => number === count.medalla).length;
                    count.count = actualTagLength;
                })
                
                var hash = {};
                var x = counterMedallas.filter(function(current) {
                var exists = !hash[current.medalla];
                hash[current.medalla] = true;
                return exists;
                });
                result.bronce = x;
              /* result.bronce = counterMedallas.filter(function(item, index, array) {
                    return array.indexOf(item) === index;
                  });*/
                  let suma = 0;
                  for(let e of result.bronce){
                      suma = suma + e.count;
                  }
                  result.totalBronce = suma;
              // result.bronce = counterMedallas;
             

            }
            if(result.plata!= null)
            { 
                let arr= result.plata.split(",");
                const medallas = arr.filter((number, i) => i == 0 ? true : number[i - 1] != number);
                const counterMedallas = medallas.map(_medal => {
                    return {medalla: _medal, count: 0};
                });
                
                counterMedallas.map((count, i) =>{
                    const actualTagLength = arr.filter(number => number === count.medalla).length;
                    count.count = actualTagLength;
                })
                var hash = {};
                var x = counterMedallas.filter(function(current) {
                var exists = !hash[current.medalla];
                hash[current.medalla] = true;
                return exists;
                });
                result.plata = x;
                let suma = 0;
                for(let e of result.plata){
                    suma = suma + e.count;
                }
                result.totalPlata = suma;
             

            }
            if(result.oro!= null)
            { 
                let arr= result.oro.split(",");
                const medallas = arr.filter((number, i) => i == 0 ? true : number[i - 1] != number);
                const counterMedallas = medallas.map(_medal => {
                    return {medalla: _medal, count: 0};
                });
                
                counterMedallas.map((count, i) =>{
                    const actualTagLength = arr.filter(number => number === count.medalla).length;
                    count.count = actualTagLength;
                })
                var hash = {};
                var x = counterMedallas.filter(function(current) {
                var exists = !hash[current.medalla];
                hash[current.medalla] = true;
                return exists;
                });
                result.oro = x;
                let suma = 0;
                for(let e of result.oro){
                    suma = suma + e.count;
                }
                result.totalOro = suma;
             

            }
            console.log(result);
            response.status(200).render("user_profile",{usuario, perfil: result});
         
        } 
    });
});
/*
app.get("/infoUsuario",comprobarUsuario, function (request, response) {
    let email = response.locals.email;
    daoU.infoUserPrincipal(email , function(err, result){
        if (err) {
            response.status(500).send(err);
        }
        else{
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            console.log(result);
            response.status(200).render("user_profile",{usuario, perfil: result[0]});
         
        } 
    });
});*/
app.get("/searchUser",comprobarUsuario, function (request, response) {
    let texto =request.query.userSearch;
    daoU.getFilterUser(texto, function (err, results){
        if (err) {
            response.status(500).send(err);
        }
        else{
            results = results.filter(el => el != '');
            for(let it of results){
                let arr = [];
                if(it.tags!= null)
                { 
                    arr= it.tags.split(",");
                    const tags = arr.filter((number, i) => i == 0 ? true : number[i - 1] != number);
                    const counterTags = tags.map(_tag => {
                        return {tag: _tag, count: 0};
                    });
                    
                    counterTags.map((count, i) =>{
                        const actualTagLength = arr.filter(number => number === count.tag).length;
                        count.count = actualTagLength;
                    })
                   
                    let max = 0;
                    let nombre;
                    counterTags.forEach(e =>{
                        if(max < e.count){
                            max = e.count;
                            nombre = e.tag;
                            it.tags = nombre;
                        } 
                    });
                 

                }
            }
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.status(200).render("filter_users_name",{usuario, usuarios: results, filtro: texto});
         
        }
    });
});
app.get("/questions", comprobarUsuario, function (request, response) {
    daoQ.getAllQuestion(function (err, results) {
        if (err) {
            response.status(500).send(err);
        }
        else {
            results = results.filter(el => el != '');
            //console.log(results);
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
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
app.get("/likeQuestion", comprobarUsuario, function (request, response) {
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
                    daoU.insertMedalVoteQuestion(like[1], function(err, res){
                        if (err) {
                            console.log(err.message);
                        }
                        else{
                            response.redirect(`/questions/${like[1]}`);
                        }
                    });
                   
                }
            });
        }
    });
});

app.get("/like", comprobarUsuario, function (request, response) {

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
                else{
                    daoU.insertMedalVoteResponse(like[1],function(err,res){
                        if (err) {
    
                            console.log(err.message);
                        }
                        else {
                            response.redirect(`/questions/${like[2]}`);
                        }
                    });
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

app.post("/formResponse", comprobarUsuario, function (request, response) {
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
app.post("/formQuestion", comprobarUsuario, function (request, response) {

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
    daoU.getUserImageName(response.locals.email, function (error, usuario) {
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
