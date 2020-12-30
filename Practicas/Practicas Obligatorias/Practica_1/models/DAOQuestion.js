"use strict"
const moment = require("moment");
const { resourceLimits } = require("worker_threads");
class DAOQuestion {
    constructor(pool) {
        this.pool = pool;
    }


    insertQuestion(title, body, id_user, tags, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql_insert_question = "INSERT INTO question(title,body,id_user,date) VALUES (?,?,(select id from usuario where email = ?),?)";
                const e = Date.now();
                const fecha = new Date(e);
                connection.query(sql_insert_question, [title, body, id_user, fecha], function (err, quest) {
                    //   connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos al insertar pregunta"));
                    }
                    else {
                        let sql_update = "UPDATE usuario set publicate_questions = publicate_questions + 1 where email = ?";
                        connection.query(sql_update, [id_user], function (err, upd) {
                            connection.release();
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos al update usuario sumar una pregunta"));
                            }
                            else {
                                if (tags.length > 0) {
                                    tags.forEach(it => {
                                        let sql2 = "INSERT INTO tag (name) SELECT * FROM (SELECT ?) " +
                                            "AS tmp WHERE NOT EXISTS ( " +
                                            "SELECT name FROM tag WHERE name = ? " +
                                            ") LIMIT 1"
                                        connection.query(sql2, [it, it], function (err, res) {

                                            if (err) {

                                                callback(new Error("Error de acceso a la base de datos al insertar tags"));
                                            }
                                            else {
                                                let sql3 = "insert into question_tag(id_question, id_tag) values(?, (select id from tag WHERE name = ?))"
                                                connection.query(sql3, [quest.insertId, it], function (err, result) {
                                                   
                                                    if (err) {

                                                        callback(new Error("Error de acceso a la base de datos al insertar question-tags"));
                                                    }
                                                });
                                            }
                                        });
                                    });

                                    callback(null, "Insertados");
                                }
                                else {

                                    callback(null, "Insertados sin tags");
                                }
                            }
                        });
                    }
                });
            }
        });
    }


    getAllQuestionNoAnswer(callback) {
        this.pool.getConnection(function (err, connection) {
            let sql = "SELECT q.id, q.title, q.body, q.id_user, q.date, u.name as 'NombreUsuario' ,u.imagen, t.name as 'nombreTag' FROM question q left join response res on (res.id_question = q.id) left join usuario u on (u.id = q.id_user) left join question_tag qt on (qt.id_question = q.id) left join tag t on (t.id = qt.id_tag) WHERE res.id IS NULL order by q.date desc";
            connection.query(sql, function (err, result) {
                connection.release();
                if (err) {

                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    let array = [];
                    for (let it of result) {
                        if (!array[it.id])
                            array[it.id] = {
                                "id": it.id,
                                "title": it.title,
                                "body": it.body,
                                "date": moment(it.date).format('DD/MM/YYYY'),
                                "usuario": it.NombreUsuario,
                                "idUsuario": it.id_user,
                                "imagen": it.imagen,
                                "tags": []
                            };
                        if (it.nombreTag) array[it.id].tags.push(it.nombreTag);
                    }
                    array.sort(function (a, b) {
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        let bb = [];
                        bb = b.date.split("/");
                        let aa = [];
                        aa = a.date.split("/");
                        //mismo año
                        if (aa[2] == bb[2]) {
                            if (aa[1] == bb[1]) {
                                return bb[0] - aa[0];
                            }
                            else {
                                return bb[1] - aa[1];
                            }
                        }
                        return bb[2] - aa[2];
                    });

                    result = array;

                    callback(null, result);
                }
            });
        });
    }
   
   /* getAllUsers(callback){
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let sql = "SELECT u.id, u.name, u.imagen, u.reputation FROM usuario u";
                connection.query(sql,function(err,result){
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        let array = [];
                        for (let it of result) {
                            if (!array[it.id])
                                array[it.id] = {
                                    "id": it.id,
                                    "name": it.name,
                                    "imagen": it.imagen,
                                    "reputation": it.reputation
                                };
                            
                        }
                        result = array;
                       
                        callback(null,result);
                    }
                });
            }
        });
       
    }*/
    getAllQuestion(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {

                let sql = "SELECT q.id, q.title, q.body, q.id_user, q.date, u.name as 'NombreUsuario'" +
                    ",u.imagen, t.name as 'nombreTag' FROM question q left join usuario u on (u.id = q.id_user) left join question_tag qt on (qt.id_question = q.id) left join tag t on (t.id = qt.id_tag) order by q.date desc";
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        let array = [];
                        for (let it of result) {
                            if (!array[it.id])
                                array[it.id] = {
                                    "id": it.id,
                                    "title": it.title,
                                    "body": it.body,
                                    "date": moment(it.date).format('DD/MM/YYYY'),
                                    "usuario": it.NombreUsuario,
                                    "idUsuario": it.id_user,
                                    "imagen": it.imagen,
                                    "tags": []
                                };
                            if (it.nombreTag) array[it.id].tags.push(it.nombreTag);
                        }
                        array.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            let bb = [];
                            bb = b.date.split("/");
                            let aa = [];
                            aa = a.date.split("/");
                            //mismo año
                            if (aa[2] == bb[2]) {
                                if (aa[1] == bb[1]) {
                                    return bb[0] - aa[0];
                                }
                                else {
                                    return bb[1] - aa[1];
                                }
                            }
                            return bb[2] - aa[2];
                        });
                        result = array;

                        callback(null, result);
                    }
                });
            }
        });

    }

    numberQuestionVote(id_question, id_user, id_mio, voto, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                //AQUI ANTES COMPROBAR QUE ESTA PREGUNTA NO ES MIA(???)
                const e = Date.now();
                const today = new Date(e);
                //COMPROBAR SI YA HE VOTADO YO A ESA PERSONA
                let sql = "SELECT id_user FROM vote_question_user WHERE id_user = ? and id_question = ?";
                connection.query(sql, [id_mio, id_question], function (err, result) {
                    //     connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (result.length > 0) {

                            callback(new Error("No puedes votar dos veces a esta pregunta"));
                        }
                        else {
                            let sql_insert = "INSERT INTO vote_question_user(id_question,id_user,date) VALUES(?,?,?)";
                            connection.query(sql_insert, [id_question, id_mio, today], function (err, result) {
                                if (err) {

                                    callback(new Error("Error de acceso a la base de datos 2"));
                                }
                                else {

                                    if (voto == 1) {
                                        let sql_update = "UPDATE question SET counter_vote = counter_vote + 1 WHERE id = ?";
                                        connection.query(sql_update, [id_question], function (err, res) {
                                            if (err) {

                                                callback(new Error("Error de acceso a la base de datos 3"));
                                            }
                                            //COMPROBAR LAS MEDALLAS
                                            else {
                                                let sql_update = "UPDATE usuario SET reputation = reputation + 10 WHERE id = ?";
                                                connection.query(sql_update, [id_user], function (err, res) {
                                                    connection.release();
                                                    if (err) {

                                                        callback(new Error("Error de acceso a la base de datos 4"));
                                                    }
                                                    else {

                                                        callback(null, true);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        let sql_update = "UPDATE question SET counter_vote = counter_vote - 1 WHERE id = ?";
                                        connection.query(sql_update, [id_question], function (err, res) {
                                            if (err) {

                                                callback(new Error("Error de acceso a la base de datos 3"));
                                            }
                                            else {
                                                let sql_update = "UPDATE usuario SET reputation = reputation -2 WHERE id = ?";
                                                connection.query(sql_update, [id_user], function (err, res) {
                                                    connection.release();
                                                    if (err) {

                                                        callback(new Error("Error de acceso a la base de datos 4"));
                                                    }
                                                    else {

                                                        callback(null, true);
                                                    }
                                                });
                                            }
                                        });
                                    }

                                }

                            });
                        }
                    }
                });
            }
        });
    }
    getResponse(id_question, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql = "SELECT r.id, r.message, r.date, r.votes, u.name as 'nombreUsuario', u.imagen, u.id as 'id_user' from response r LEFT join usuario u on (u.id = r.id_user) where r.id_question = ?";
                //     console.log(sql);
                connection.query(sql, [id_question], function (err, result) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {

                        let array = [];
                        for (let it of result) {
                            if (!array[it.id])
                                array[it.id] = {
                                    "id": it.id,
                                    "message": it.message,
                                    "date": moment(it.date).format('DD/MM/YYYY'),
                                    "counter_vote": it.votes,
                                    "usuario": it.nombreUsuario,
                                    "idUsuarioQ": it.id_user,
                                    "imagen": it.imagen,
                                };
                        }

                        result = array;

                        callback(null, result);
                    }
                });
            }
        });
    }
    isVisit(id_question, email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql = "SELECT * from visit_question_user where id_question = ?  and id_user = (select id from usuario u where u.email = ?);"
                connection.query(sql, [id_question, email], function (err, res) {
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        if (res.length > 0) {
                            callback(null, true);
                        }
                        else callback(null, false);
                    }
                });
            }
        });
    }
    /*
    setQuestionVisit(id,email,callback){
        this.pool.getConnection(function(err,connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{

                let sql = "UPDATE question q "+
                "set q.counter_visit = q.counter_visit + 1 "+
                "where q.id = ?";
                connection.query(sql,[id],function(err,res){
                   //  connection.release();
                    if(err){
                        console.log("error");
                     
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        const e = Date.now();
                        const today = new Date(e);
                        let sql2 ="insert into visit_question_user values (( SELECT u.id from usuario u  where u.email = ?) , (SELECT q.id from question q where q.id = ?) ,?)";
                        connection.query(sql[email,id,today], function(err,res){
                            console.log("hace release");
                            connection.release();
                            if(err){
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                callback(null,true);
                            }
                        
                        });
                       
                    }
                });
            }
        });
    }
     */
    setQuestionVisit(id, email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {

                let sql = "UPDATE question q " +
                    "set q.counter_visit = q.counter_visit + 1 " +
                    "where q.id = ?";
                connection.query(sql, [id], function (err, res) {
                    //    connection.release();

                    if (err) {
                        //   connection.release();
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        const e = Date.now();
                        const today = new Date(e);
                        let sql2 = "insert into visit_question_user values (( SELECT u.id from usuario u  where u.email = ?) , (SELECT q.id from question q where q.id = ?) ,?)";

                        connection.query(sql2, [email, id, today], function (err, res) {
                            connection.release();
                            console.log("hace release");
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else {
                                callback(null, true);
                            }

                        });
                    }
                });
            }
        });
    }
    comprobarVotoQuestion(id, email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql = "SELECT * from vote_question_user where id_question = ? and id_user = (select id from usuario u where u.email = ?)";
                connection.query(sql, [id, email], function (err, res) {
                    connection.release();
                    if (err) {
                        //  connection.release();
                        callback(new Error("Error de acceso a la base de datos1"));
                    }
                    else {
                        if (res.length > 0) {
                            //   connection.release();
                            callback(new Error("No puedes votar de nuevo"));
                        }
                        else {
                            //     connection.release();
                            callback(null, "No existe");
                        }
                    }
                });
            }
        });
    }
    comprobarVoto(email, id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql = "SELECT * from vote_response_user where id_response = ? and id_user = (select id from usuario u where u.email = ?)";
                connection.query(sql, [id, email], function (err, res) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos1"));
                    }
                    else {
                        //    console.log(res);
                        if (res.length > 0) {

                            callback(new Error("No puedes votar de nuevo"));
                        }
                        else {

                            callback(null, "No existe");
                        }
                    }
                });
            }

        });
    }
    setResponseVoteQuestion(like, id_question, email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                if (like === "1") {
                    let sql = "UPDATE question res set res.counter_vote = res.counter_vote + 1  where res.id = ?";
                    connection.query(sql, id_question, function (err, res) {
                        //     connection.release();
                        if (err) {
                            //   connection.release();
                            callback(new Error("Error de acceso a la base de datos1"));
                        }
                        else {
                            let sql1 = "UPDATE usuario u left join question r on (r.id_user = u.id) set u.reputation = u.reputation + 10 where r.id = ?";
                            connection.query(sql1, id_question, function (err, res) {
                                if (err) {
                                    //   connection.release();
                                    callback(new Error("Error de acceso a la base de datos2"));
                                }
                                else {
                                    const e = Date.now();
                                    const today = new Date(e);
                                    let sql2 = "insert into vote_question_user values (( SELECT u.id from usuario u  where u.email = ?) , (SELECT rr.id from question rr where rr.id = ?) ,?)";

                                    connection.query(sql2, [email, id_question, today], function (err, res) {
                                        if (err) {
                                            //  connection.release();
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            let sql3 = "update question res set res.votes = res.votes + 1 where res.id = ?";
                                            connection.query(sql3, id_question, function (err, res) {
                                                connection.release();
                                                if (err) {
                                                    //  connection.release();
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else callback(null, "Insertado");
                                            });

                                        }
                                    });
                                }

                            });
                        }
                    });
                }
                else {
                    let sql = "UPDATE question res set res.counter_vote = res.counter_vote - 1  where res.id = ?";
                    connection.query(sql, id_question, function (err, res) {
                        //    connection.release();
                        if (err) {

                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {


                            let sql1 = "UPDATE usuario u left join question r on (r.id_user = u.id) SET u.reputation = " +
                                "(case when u.reputation - 2 <= 0  then  1 else u.reputation - 2 end)" +
                                " where r.id = ?";
                            connection.query(sql1, id_question, function (err, res) {
                                if (err) {

                                    callback(new Error("Error de acceso a la base de datos"));
                                }
                                else {
                                    const e = Date.now();
                                    const today = new Date(e);
                                    let sql2 = "insert into vote_question_user values (( SELECT u.id from usuario u  where u.email = ?) , (SELECT rr.id from question rr where rr.id = ?) ,?)";
                                    connection.query(sql2, [email, id_question, today], function (err, res) {
                                        if (err) {
                                            //  connection.release();
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            let sql3 = "update question res set res.votes = res.votes + 1 where res.id = ?";
                                            connection.query(sql3, id_question, function (err, res) {
                                                connection.release();
                                                if (err) {
                                                    //  connection.release();
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else callback(null, "Insertado");
                                            });

                                        }
                                    });
                                }

                            });
                        }
                    });
                }
            }
        });
    }
    setResponseVote(like, id_response, email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                if (like === "1") {
                    let sql = "UPDATE response res set res.counter_vote = res.counter_vote + 1  where res.id = ?";
                    connection.query(sql, id_response, function (err, res) {
                        //     connection.release();
                        if (err) {
                            //   connection.release();
                            callback(new Error("Error de acceso a la base de datos1"));
                        }
                        else {
                            let sql1 = "UPDATE usuario u left join response r on (r.id_user = u.id) set u.reputation = u.reputation + 10 where r.id = ?";
                            connection.query(sql1, id_response, function (err, res) {
                                if (err) {
                                    //   connection.release();
                                    callback(new Error("Error de acceso a la base de datos2"));
                                }
                                else {
                                    const e = Date.now();
                                    const today = new Date(e);
                                    let sql2 = "insert into vote_response_user values (( SELECT u.id from usuario u  where u.email = ?) , (SELECT rr.id from response rr where rr.id = ?) ,?)";

                                    connection.query(sql2, [email, id_response, today], function (err, res) {
                                        if (err) {
                                            //  connection.release();
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            let sql3 = "update response res set res.votes = res.votes + 1 where res.id = ?";
                                            connection.query(sql3, id_response, function (err, res) {
                                                connection.release();
                                                if (err) {
                                                    //  connection.release();
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else callback(null, "Insertado");
                                            });

                                        }
                                    });
                                }

                            });
                        }
                    });
                }
                else {
                    let sql = "UPDATE response res set res.counter_vote = res.counter_vote - 1  where res.id = ?";
                    connection.query(sql, id_response, function (err, res) {
                        //    connection.release();
                        if (err) {

                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {


                            let sql1 = "UPDATE usuario u left join response r on (r.id_user = u.id) SET u.reputation = " +
                                "(case when u.reputation - 2 <= 0  then  1 else u.reputation - 2 end)" +
                                " where r.id = ?";
                            connection.query(sql1, id_response, function (err, res) {
                                if (err) {

                                    callback(new Error("Error de acceso a la base de datos"));
                                }
                                else {
                                    const e = Date.now();
                                    const today = new Date(e);
                                    let sql2 = "insert into vote_response_user values (( SELECT u.id from usuario u  where u.email = ?) , (SELECT rr.id from response rr where rr.id = ?) ,?)";
                                    connection.query(sql2, [email, id_response, today], function (err, res) {
                                        if (err) {
                                            //  connection.release();
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else {
                                            let sql3 = "update response res set res.votes = res.votes + 1 where res.id = ?";
                                            connection.query(sql3, id_response, function (err, res) {
                                                connection.release();
                                                if (err) {
                                                    //  connection.release();
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                }
                                                else callback(null, "Insertado");
                                            });

                                        }
                                    });
                                }

                            });
                        }
                    });
                }
            }
        });

    }
    getQuestion(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                //   console.log("Estoy dentro de getquestion");
                let sql = "SELECT q.id, q.title, q.body, q.date, q.counter_visit, q.votes, u.name as 'nombreUsuario', u.imagen, u.id as 'id_userq', t.name as 'nombreTag' from question q left join question_tag qt on (qt.id_question = q.id) left join tag t on (t.id = qt.id_tag) left join usuario u on (u.id = q.id_user) where q.id = ?";


                connection.query(sql, [id], function (err, result) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {

                        let array = [];
                        for (let it of result) {
                            if (!array[it.id])
                                array[it.id] = {
                                    "id": it.id,
                                    "title": it.title,
                                    "body": it.body,
                                    "date": moment(it.date).format('DD/MM/YYYY'),
                                    "counter_visit": it.counter_visit,
                                    "counter_vote": it.votes,
                                    "usuario": it.nombreUsuario,
                                    "idUsuarioQ": it.id_userq,
                                    "imagen": it.imagen,
                                    "tags": []
                                };
                            if (it.nombreTag) array[it.id].tags.push(it.nombreTag);
                        }

                        result = array;

                        callback(null, result);
                    }
                });

            }
        });
    }
    getQuestionFilterTag(tag, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql = "SELECT q.id, q.title, q.body, q.id_user, q.date, u.name as 'NombreUsuario', u.imagen,t.name as 'nombreTag' " +
                    "FROM question q " +
                    "left join usuario u on (u.id = q.id_user) " +
                    " left join question_tag qt on (qt.id_question = q.id) " +
                    "left join tag t on (t.id = qt.id_tag)" +
                    "WHERE q.id in " +
                    "(select qq.id from question qq " +
                    "left join question_tag qt on (qt.id_question = qq.id) " +
                    "left join tag t on (t.id = qt.id_tag)" +
                    " WHERE t.name = ?" +
                    "GROUP BY qq.id)";

                //   let sql = "SELECT q.id, q.title, q.body, q.id_user, q.date, u.name as 'NombreUsuario', u.imagen, t.name as 'nombreTag' FROM question q left join usuario u on (u.id = q.id_user) left join question_tag qt on (qt.id_question = q.id) left join tag t on (t.id = qt.id_tag) " +
                //       " WHERE t.name = ?";
                connection.query(sql, [tag], function (err, result) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        let array = [];
                        for (let it of result) {

                            if (!array[it.id])
                                array[it.id] = {
                                    "id": it.id,
                                    "title": it.title,
                                    "body": it.body,
                                    "date": moment(it.date).format('DD/MM/YYYY'),
                                    "usuario": it.NombreUsuario,
                                    "idUsuario": it.id_user,
                                    "imagen": it.imagen,
                                    "tags": []
                                };
                            if (it.nombreTag) array[it.id].tags.push(it.nombreTag);
                        }
                        array.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            let bb = [];
                            bb = b.date.split("/");
                            let aa = [];
                            aa = a.date.split("/");
                            //mismo año
                            if (aa[2] == bb[2]) {
                                if (aa[1] == bb[1]) {
                                    return bb[0] - aa[0];
                                }
                                else {
                                    return bb[1] - aa[1];
                                }
                            }
                            return bb[2] - aa[2];
                        });
                        result = array;

                        callback(null, result);
                    }
                });

            }
        });
    }
    insertResponse(id_question,body_response,email,callback){
        this.pool.getConnection(function(err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                let sql = "INSERT INTO response (message, id_question, id_user, date) VALUES ( ?, ?, (SELECT id from usuario where email = ?), ?);"
                const e = Date.now();
                const today = new Date(e);
                console.log(sql);
                connection.query(sql,[body_response,id_question,email,today],function(err, result){
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        console.log("ha hecho insert");
                        let sql1 = "UPDATE  usuario set publicate_response = publicate_response +1 where email = ?";
                        connection.query(sql1,email,function(err,result){
                            connection.release();
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                console.log("ha hecho update");
                                callback(null,"Pregunta realizada");
                            }
                        });
                    }
                });
            }
        });
    }
    getQuestionFilterText(texto, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                let sql = `SELECT q.id, q.title, q.body, q.id_user, q.date, u.name as 'NombreUsuario', u.imagen, t.name as 'nombreTag' FROM question q left join usuario u on (u.id = q.id_user) left join question_tag qt on (qt.id_question = q.id) left join tag t on (t.id = qt.id_tag) WHERE title like '%${texto}%' or body like '%${texto}%'`;

                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) {

                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else {
                        let array = [];
                        for (let it of result) {

                            if (!array[it.id])
                                array[it.id] = {
                                    "id": it.id,
                                    "title": it.title,
                                    "body": it.body,
                                    "date": moment(it.date).format('DD/MM/YYYY'),
                                    "usuario": it.NombreUsuario,
                                    "idUsuario": it.id_user,
                                    "imagen": it.imagen,
                                    "tags": []
                                };
                            if (it.nombreTag) array[it.id].tags.push(it.nombreTag);
                        }
                        array.sort(function (a, b) {
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            let bb = [];
                            bb = b.date.split("/");
                            let aa = [];
                            aa = a.date.split("/");
                            //mismo año
                            if (aa[2] == bb[2]) {
                                if (aa[1] == bb[1]) {
                                    return bb[0] - aa[0];
                                }
                                else {
                                    return bb[1] - aa[1];
                                }
                            }
                            return bb[2] - aa[2];
                        });
                        result = array;

                        callback(null, result);
                    }
                });
            }
        });
    }
}

module.exports = DAOQuestion;