"use strict"
const moment = require("moment");
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
                    connection.release();
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos al insertar pregunta"));
                    }
                    else {
                        let sql_update = "UPDATE usuario set publicate_questions = publicate_questions + 1 where email = ?";
                        connection.query(sql_update, [id_user], function (err, upd) {
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
                    connection.release();
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
    getQuestionFilterTag(tag, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {

                let sql = "SELECT q.id, q.title, q.body, q.id_user, q.date, u.name as 'NombreUsuario', u.imagen, t.name as 'nombreTag' FROM question q left join usuario u on (u.id = q.id_user) left join question_tag qt on (qt.id_question = q.id) left join tag t on (t.id = qt.id_tag) " +
                    " WHERE t.name = ?";
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