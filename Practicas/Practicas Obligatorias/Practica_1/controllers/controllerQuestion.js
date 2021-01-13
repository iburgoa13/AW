const questionModel = require("../models/DAOQuestion");
const userModel = require("../models/DAOUsers");
const config = require("../config");
const mysql = require("mysql");
const { render } = require("ejs");
const pool = mysql.createPool(config.mysqlConfig);
const daoQ = new questionModel(pool);
const daoU = new userModel(pool);

function getQuestionFilterTag(request,response,next){
    daoQ.getQuestionFilterTag(request.query.tagName, function (err, results) {
        if (err) {
            next(err);
        }
        else {

            results = results.filter(el => el != '');
            let textoTag = request.query.tagName;
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.render("filter_question_tag", { usuario, questions: results, textoTag });
        }
    });
}
function formular(request,response,next){
    let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
    response.status(200).render("form_question",
        { usuario, errorMsg:null });
}
function getQuestionFilterText(request , response,next){
    daoQ.getQuestionFilterText(request.query.texto, function (err, results) {
        if (err) {
            next(err);
        }
        else {
    
            results = results.filter(el => el != '');
            let texto = request.query.texto;
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
    
            response.render("filter_question_text", { usuario, questions: results, texto });
        }
    });
}


function getAllQuestionNoAnswer(request,response,next){
    daoQ.getAllQuestionNoAnswer(function (err, results) {
        if (err) {
            next(err);
        }
        else {
            results = results.filter(el => el != '');
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.render("no_response_question", { usuario, questions: results });
        }
    });
}

function getQuestionID(request,response,next){
    let id = request.params.id_question;
    let email = response.locals.email;
    daoQ.isVisit(id, email, function (err, res) {
        if (err) {
            
            next(err);
        }
        else {
            if (!res) { //si es false == votas
                daoQ.setQuestionVisit(id, email, function (err, r) {
                    if (err) {
                       
                        next(err);
                    }
                    else{
                        daoU.insertMedalQuestionVisit(id, function(err, result){
                            if (err) {
                               
                                next(err);
                            }
                            else {
                                daoQ.getQuestion(id, function (err, result) {
                                    if (err) {
                                        next(err);
                                    }
                                    else {
                                        daoQ.getResponse(id, function (err, res) {
                                            if (err) {
                                                next(err);
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
                        next(err);
                    }
                    else {

                        daoQ.getResponse(id, function (err, res) {
                            if (err) {
                                next(err);
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
}
function getAllQuestion(request,response,next){
    daoQ.getAllQuestion(function (err, results) {
        if (err) {
            next(err);
        }
        else {
            results = results.filter(el => el != '');
            let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
            response.render("questions", { usuario, questions: results });
        }
    });
}

function likeQuestion(request,response,next){
    let email = response.locals.email;
    let like = request.params.id_like;
    let id_question = request.params.id_question;
    //let like = request.query.like.split("_");
    daoQ.comprobarVotoQuestion(id_question, email, function (err, res) {
        if (err) {
            response.redirect(`/questions/${id_question}`)
        }
        else {
            daoQ.setResponseVoteQuestion(like, id_question, email, function (err, res) {
                if (err) {
                    
                    next(err);
                }
                else {
                    daoU.insertMedalVoteQuestion(id_question, function(err, res){
                        if (err) {
                            next(err);
                        }
                        else{
                            response.redirect(`/questions/${id_question}`);
                        }
                    });
                   
                }
            });
        }
    });
}

function like(request,response,next){
    let email = response.locals.email;
    let like = request.params.id_like;
    let id_response = request.params.id_response;
    let id_question = request.params.id_question;

    daoQ.comprobarVoto(email,id_response, function (err, res) {
        if (err) {
            response.redirect(`/questions/${id_question}`);
        }
        else {
            daoQ.setResponseVote(like,id_response, email, function (err, res) {
                if (err) {
                    next(err);
                }
                else{
                    daoU.insertMedalVoteResponse(id_response,function(err,res){
                        if (err) {
                            next(err);
                        }
                        else {
                            response.redirect(`/questions/${id_question}`);
                        }
                    });
                }
            });
        }
    });
}

function insertResponse(request,response,next){
    let id_question = request.body.id_question;
    
    let body_response = request.body.texto;
    let email = response.locals.email;
    daoQ.insertResponse(id_question,body_response,email,function(err,res){
        if(err){
            next(err);
        }
        else{
            response.status(200);
            response.redirect(`/questions/${id_question}`);
        }
    });

}

function insertQuestion(request,response,next){
      //array de tags
      let tags = [];
      let texto = request.body.etiquetas;
  
      //aqui si no es indefinido 
      if (typeof texto != "undefined" && typeof texto == "string" && texto != "" && texto.length > 0) {
          //queremos recoger el tag
          tags = (texto.match(/@\w+/g) || []).map(n => n.replace("@", ""));
      }
      if (tags.length > 5) {
          let errorMsg= "El maximo de tags es 5";
          let usuario = { nombre: response.locals.userNombre, id: response.locals.id };
          response.render("form_question",{usuario,errorMsg});
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
                  response.status(200).redirect("/usuarios/home");
              }
          });
      }
  
}
module.exports = {
    getAllQuestionNoAnswer,
    getQuestionID,
    getQuestionFilterTag,
    getQuestionFilterText,
    getAllQuestion,
    likeQuestion,
    like,
    insertResponse,
    insertQuestion,
    formular
}