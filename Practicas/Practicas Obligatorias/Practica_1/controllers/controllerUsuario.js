const userModel = require("../models/DAOUsers");
const config = require("../config");
const path = require("path");
const mysql = require("mysql");
const pool = mysql.createPool(config.mysqlConfig);
const daoU = new userModel(pool);

function comprobarUsuario(request, response, next) {

    if (request.session.currentUser) {
        daoU.getUserName(request.session.currentUser,
            function (err, res) {
                if (err) {
                    next(err);
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
        response.redirect("/usuarios/login");
    }
}

function loginPost(request,response,next){
    daoU.isUserCorrect(request.body.correo, request.body.password,
        function (error, userCorrect) {
            if (error) { // error de acceso a la base de datos
                response.status(500);
                response.render("login",
                    { errorMsg: error.message });
            }
            else if (userCorrect) {

                request.session.currentUser = request.body.correo;

                response.redirect("/usuarios/home");
            }
            else {
                response.status(200);
                response.render("login",
                    { errorMsg: error.message });
            }
        });
}
function loginGet(request,response,next){
    response.status(200).render("login", { errorMsg: null })
}
function getUserId(request,response,next){

    let id = request.params.id_user;
    id = parseInt(id);
    if(!Number.isInteger(parseInt(id))){//if(typeof id != 'number'){
        response.status(404).render('404');
    } 
    else{
        daoU.getInfoUser(id,function(err, result){
            if (err) {
                next(err);//response.status(404).render('404');// next(err);//response.status(500).send(err);
            }
            else{
                let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
                if(result.bronce!= null)
                { 
                    let arr= result.bronce.split(",");
                    
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
               
                response.status(200).render("user_profile",{usuario, perfil: result});
             
            } 
        });
    }
   
}

function getAllUsers(request,response,next){
    daoU.getAllUsers(function(err, results){
        if (err) {
            next(err);//response.status(500).send(err);
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
}

function getFilterUser(request,response,next){
  
    let texto =request.query.userSearch;
    daoU.getFilterUser(texto, function (err, results){
        if (err) {
            next(err);//response.status(500).send(err);
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
}

function getUserImageNameId(request,response,next){
    daoU.getUserImageNameId(request.params.userId, function (error, usuario) {
        if (error) {
            next(err);
        }
        else {
            if (!usuario) {
                response.status(200).sendFile(path.join(__dirname, "../","public", "img", "NoPerfil.png"));
            }
            else {
                response.status(200).sendFile(path.join(__dirname, "../","profile_imgs", usuario));
            }
        }
    });
}


function registerPost(request,response,next){

  
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
                response.status(200).redirect("/usuarios/home");

            }
        });
}
function home(request,response,next){
    let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
    response.status(200).render("home",
        { usuario });
}
function formQuestionHome(request,response,next){
    response.status(200).render("home", { errorMsg: null })
}
function getUserImageName(request,response,next){
    daoU.getUserImageName(response.locals.email, function (error, usuario) {
        if (error) {
            next(err);
        }
        else {
            if (!usuario) {
                response.status(200).sendFile(path.join(__dirname, "../","public", "img", "NoPerfil.png"));
            }
            else {
                response.status(200).sendFile(path.join(__dirname,"../", "profile_imgs", usuario));
            }
        }
    });
}
function registerGet(request,response,next){
    response.status(200).render("register", { errorMsg: null })
}
function logoutU(request,response,next){
    request.session.destroy();
    response.redirect("/");
}

module.exports = {
    loginGet,
    loginPost,
    getAllUsers,
    getUserId,
    getFilterUser,
    getUserImageNameId,
    registerPost,
    getUserImageName,
    home,
    formQuestionHome,
    registerGet,
    logoutU,
    comprobarUsuario
}