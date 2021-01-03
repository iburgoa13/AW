"use strict"
const path = require("path");
const moment = require("moment");



class DAOUsers {

    constructor(pool) {
        this.pool = pool;
    }

    //INSERCION USUARIO
    insertUser(email, password, password2, name, img, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                if (password != password2) {
                    callback(new Error("Las contraseñas no coinciden"));
                }
                else {
                    const e = Date.now();
                    const today = new Date(e);
                    let sql_select = "SELECT email FROM usuario WHERE email = ?";
                    //compruebo si existe usuario
                    connection.query(sql_select, [email], function (err, resultado) {

                        if (err) {

                            callback(new Error("Error de acceso a la base de datos1"));

                        }
                        else {
                            if (resultado.length > 0) {

                                callback(new Error("El email ya existe en la base de datos"));
                            }
                            else {

                                if (img === undefined || img === "") {
                                    img = null;
                                }
                                //MIRAR IMAGEN
                                let sql = "INSERT INTO usuario(email,password,name,imagen,date) VALUES(?,?,?,?,?)";


                                connection.query(sql, [email, password, name, img, today], function (err, resultado) {
                                    connection.release();
                                    if (err) {

                                        callback(new Error("Error de acceso a la base de datos2"));
                                    }
                                    //insercion correcta
                                    else {

                                        callback(null, true);
                                    }
                                });
                            }
                        }
                    });
                }




            }
        });
    }

    //USUARIO CORRECTO
    isUserCorrect(email, password, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuario WHERE email = ?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {

                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            //Comprobamos si el email existe
                            if (rows.length === 0) {

                                callback(new Error("Usuario y/o contraseña incorrecta"));
                            }
                            else {
                                //Si existe el email y la pass es correcta
                                if (rows[0].password === password) {

                                    callback(null, true);
                                }
                                //en caso de que no exista la pass con ese usuario
                                else {

                                    callback(new Error("Usuario y/o contraseña incorrecta"));
                                }
                            }
                        }
                    });
            }
        }
        );
    }

    //BUSCAR USUARIO POR CORREO
    getUser(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))

            }
            else {
                const sql = "SELECT *  FROM usuario WHERE email = ?";
                connection.query(sql, [email], function (err, resultado) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (resultado.length > 0) {

                            callback(null, resultado[0]);
                        }
                        else { //es cero

                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }

    //TOOODOS USUARIOS
    getAllUsers(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))

            }
            else {
                const sql = "SELECT *  FROM usuario";
                connection.query(sql, function (err, resultado) {
                    connection.release();
                    if (err) {
                        connection.release();
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (resultado.length > 0) {
                            let usuarios = [];
                            for (let it of resultado) {
                                usuarios[it.id] = {
                                    "id": it.id,
                                    "email": it.email,
                                    "name": it.name,
                                    "img": it.imagen,
                                    "date": it.date,
                                    "reputation": it.reputation,
                                    "publicate_questions": it.publicate_questions,
                                    "publicate_response": it.publicate_response
                                };

                            }

                            resultado = usuarios;

                            callback(null, resultado);
                        }
                        else { //es cero

                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }
    insertMedalVoteResponse(id_response,callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else{
                const sql ="select counter_vote, id_user from response where id = ?";
                connection.query(sql,[id_response],function (err, result){
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        const e = Date.now();
                        const today = new Date(e);
                        const votos = result[0].counter_vote;
                        const id_user = result[0].id_user;
                        const sql1 = "insert into user_medal_response values(?,(select id from medals where merit like '%Respuesta con ? punto%'),?,?)";
                        if(votos === 2 || votos === 4 || votos === 6){
                            connection.query(sql1,[id_user,votos,id_response,today], function(err, res){
                                connection.release();
                                if (err) {
                                  callback(new Error("Error de acceso a la base de datos"));
                              }
                              else{
                                  callback(null,true);
                              }
                            });
                        }
                        else{
                            connection.release();
                            callback(null,true);
                        }

                    }
                });
            }
        });
    }
    insertMedalVoteQuestion(id_question,callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else{
                const sql ="select counter_vote, id_user from question where id = ?";
                connection.query(sql,[id_question],function (err, result){
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        const e = Date.now();
                        const today = new Date(e);
                        const votos = result[0].counter_vote;
                        const id_user = result[0].id_user;
                        const sql1 = "insert into user_medal_question values(?,(select id from medals where merit like '%Pregunta con ? punto%'),?,?)";
                        if(votos === 1 || votos === 2 || votos === 4 || votos === 6){
                            connection.query(sql1,[id_user,votos,id_question,today], function(err, res){
                                connection.release();
                                if (err) {
                                  callback(new Error("Error de acceso a la base de datos"));
                              }
                              else{
                                  callback(null,true);
                              }
                            });
                        }
                        else{
                            connection.release();
                            callback(null,true);
                        }

                    }
                });
            }
        });
    }
    insertMedalQuestionVisit(id_question,callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else{
                const sql ="select counter_visit, id_user from question where id = ?";
                console.log(sql);
                connection.query(sql,[id_question], function(err, result){
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        const e = Date.now();
                        const today = new Date(e);
                        const visitas = result[0].counter_visit;
                        const id_user = result[0].id_user;
                        const sql1 = "insert into user_medal_question values(?,(select id from medals where merit = 'Pregunta con ? visitas'),?,?)";
                        console.log(sql1);
                        console.log(visitas);
                        if(visitas === 2 || visitas === 4 || visitas === 6){
                          connection.query(sql1,[id_user,visitas,id_question,today], function(err, res){
                              connection.release();
                              if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                callback(null,true);
                            }
                          });
                        }
                        else{
                            connection.release();
                            callback(null,true);
                        } 
                        
                    }
                });
            }
        });
    }
    getUserName(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                const sql = "SELECT name , id FROM usuario WHERE email = ?";
                connection.query(sql, [email], function (err, resultado) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (resultado.length > 0)//tenemos img{
                        {

                            callback(null, resultado[0]);
                        }
                        else { //es cero

                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }
    getInfoUser(id,callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let sql = "SELECT u.id, u.name , u.imagen , u.reputation, u.publicate_questions, u.publicate_response, u.date , "+
                "GROUP_CONCAT(bronce.name) as 'bronce', GROUP_CONCAT(plata.name) as 'plata', GROUP_CONCAT(oro.name) as 'oro' "+
                "FROM usuario u  LEFT join user_medal_response umr on (u.id = umr.id_user) LEFT join user_medal_question umq on (u.id = umq.id_user) "+
                "LEFT join medals bronce on ((bronce.id = umr.id_medal or bronce.id = umq.id_medal) and bronce.medal = 'BRONCE') "+
                "LEFT join medals plata on ((plata.id = umr.id_medal or plata.id = umq.id_medal) and plata.medal = 'PLATA') "+
                "LEFT join medals oro on ((oro.id = umr.id_medal or oro.id = umq.id_medal) and oro.medal = 'ORO') "+
               "where u.id = ? ";
                //let sql ="SELECT u.id, u.name , u.imagen , u.reputation, u.publicate_questions, u.publicate_response, u.date FROM usuario u where u.id = ?";
                connection.query(sql,id,function(err,res){
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        res[0].date = moment(res[0].date).format('DD/MM/YYYY');
                        callback(null,res[0]);      
                    }
                });
            }
        }); 
    }
    infoUserPrincipal(email, callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let sql ="SELECT u.id, u.name , u.imagen , u.reputation, u.publicate_questions, u.publicate_response, u.date FROM usuario u where u.email = ?";
                connection.query(sql,email,function(err,res){
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        res[0].date = moment(res[0].date).format('DD/MM/YYYY');
                        callback(null,res);      
                    }
                });
            }
        });
    }
    getAllUsers(callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
      
            
                let sql = "SELECT u.id, u.email,u.name as 'nombre', u.imagen, u.reputation, GROUP_CONCAT(tag.name) AS tags FROM usuario u LEFT JOIN question ON question.id_user = u.id LEFT JOIN question_tag qt on (qt.id_question = question.id) left join tag ON tag.id = qt.id_tag GROUP BY email";
                connection.query(sql,function(err,result){
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                    
                       
                        callback(null,result);
                    }
                });
            }
        });
       
    }
    getFilterUser(texto, callback){
        this.pool.getConnection( function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else{
                let sql = `SELECT u.id, u.email,u.name as 'nombre', u.imagen, u.reputation, GROUP_CONCAT(tag.name) AS tags FROM usuario u LEFT JOIN question ON question.id_user = u.id LEFT JOIN question_tag qt on (qt.id_question = question.id) left join tag ON tag.id = qt.id_tag where u.name like '%${texto}%'  GROUP BY email`;
                connection.query(sql, function (err, resultado){
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                    
                       
                        callback(null,resultado);
                    }
                });
            }
        });
    }
    getUserImageName(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))

            }
            else {
                const sql = "SELECT imagen FROM usuario WHERE email = ?";
                connection.query(sql, [email], function (err, resultado) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (resultado.length > 0)//tenemos img{
                        {

                            callback(null, resultado[0].imagen);
                        }
                        else { //es cero

                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }
    /*getTopTagUser(id_user,callback){
        this.pool.getConnection(function (err,connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let sql = "select qt.id_tag 'id_tag', count(qt.id_tag) 'count_tag', t.name 'name_tag' from question q left join usuario u on (u.id = q.id_user) left join question_tag qt on (q.id = qt.id_question) left join tag t on (t.id = qt.id_tag) where u.id = ? group by qt.id_tag ORDER BY count(qt.id_tag) DESC LIMIT 1";
                connection.query(sql,id_user,function(err,result){
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if(result.length == 0){
                            callback(null,null)
                        }
                        else callback(null,result[0].name_tag);
                    }
                });
            }
        });
    }*/
    
    getUserImageNameId(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))

            }
            else {
                const sql = "SELECT imagen FROM usuario WHERE id = ?";
                connection.query(sql, [id], function (err, resultado) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (resultado.length > 0)//tenemos img{
                        {

                            callback(null, resultado[0].imagen);
                        }
                        else { //es cero

                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }

}

module.exports = DAOUsers;
