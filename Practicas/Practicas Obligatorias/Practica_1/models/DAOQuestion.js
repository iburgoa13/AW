"use strict"

class DAOQuestion{
    constructor(pool){
        this.pool= pool;
    }

    /**
     * 
     * @param {Titulo de la pregunta} title 
     * @param {Cuerpo de la pregunta} body 
     * @param {Array , máximo 5 tags} tags 
     * @param {Correo del usuario} email 
     * @param {*} callback 
     */

    insertQuestion(title,body,tags,id_user,callback){
        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            //SACAMOS TODOS LOS TAGS
            let sql_select_tags = "SELECT * FROM tag;";
            connection.query( sql_select_tags, function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos 1"));
                }
                else {
                
                    let id_tags = [];
                    let array=[];
                    //SI NO EXISTEN TAGS
                   if(rows.length == 0){
                       let sql_insert ="INSERT INTO tag(name) VALUES(?);";
                       tags.forEach(n => {
                            connection.query(sql_insert,[n],function(err,insert){
                                if(err){
                                callback(new Error("Error de acceso a la base de datos 2"));
                                }
                                else{
                                    //INSERTAMOS EN UN ARRAY LOS IDS DE LOS TAGS PARA LA TABLA INTERMEDIA
                                    id_tags.push(insert.insertId);
    
                                                    //INSERTAMOS EN BBDD PREGUNTA
                                    let sql_insert_question = "INSERT INTO question(title,body,id_user,date) VALUES (?,?,?,?)";
                                    const e = Date.now();
                                    const fecha = new Date(e);
                                    connection.query(sql_insert_question,[title,body,id_user,fecha],function(err,quest){
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos 3"));
                                        }
                                        else{
                                            //sacamos el id de la pregunta para la insercion en la tabla
                                            let id_question = quest.insertId;
                                            console.log(id_question);
                                            let array=[];
    
                                            id_tags.forEach(n => {
                                                array.push([id_question,n]);
                                                console.log(id_question + "   "+ n);
                                            });
                                            let sql_insert_question_tag = "INSERT INTO question_tag(id_question,id_tag) VALUES ?";
                                            connection.query(sql_insert_question_tag,[array],function(error,total){
                                                if(error){
                                                    callback(new Error("Error de acceso a la base de datos 4"));
                                                }
                                                else{
                                                    callback(null,true);
                                                }
                                            });
                                        }
                                    });
    
                                }
                            });
                        });  
                    } 
                    //cuando hay en base de datos tags
                    else{
                        //REVISAR
                        /*
                       let nuevos = []
                       array = rows.reduce((n,task)=>{
                            if(tags.some(m => task["name"].includes(m))) n.push(task.id);
                    
                            return n;
                        },[]);
                        nuevos = tags.reduce((n,task)=>{
                            if(rows.some(m => task.includes(m["name"]))) n.push(task);
                            return n;
                        },[]);
                       
                       console.log(array);
                       console.log(nuevos);
                       */
                    }   
                }
            });
            }
        }
        );
    }



    numberQuestionVote(id_question,id_user, id_mio, voto, callback){
        this.pool.getConnection(function(err, connection) {
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                //AQUI ANTES COMPROBAR QUE ESTA PREGUNTA NO ES MIA(???)
                const e = Date.now();
                const today = new Date(e);
                //COMPROBAR SI YA HE VOTADO YO A ESA PERSONA
                let sql = "SELECT id_user FROM vote_question_user WHERE id_user = ? and id_question = ?";
                connection.query(sql, [id_mio,id_question], function(err,result){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if(result.length > 0){
                            callback(new Error("No puedes votar dos veces a esta pregunta"));
                        }
                        else{
                            let sql_insert = "INSERT INTO vote_question_user(id_question,id_user,date) VALUES(?,?,?)";
                            connection.query(sql_insert,[id_question,id_mio,today],function(err,result){
                                if(err){
                                    callback(new Error("Error de acceso a la base de datos 2"));
                                }
                                else{ 
                                    
                                    if(voto == 1){
                                        let sql_update ="UPDATE question SET counter_vote = counter_vote + 1 WHERE id = ?";
                                        connection.query(sql_update,[id_question],function(err,res){
                                            if(err){
                                                callback(new Error("Error de acceso a la base de datos 3"));
                                            }
                                            //COMPROBAR LAS MEDALLAS
                                            else{
                                                 let sql_update ="UPDATE usuario SET reputation = reputation + 10 WHERE id = ?";
                                                    connection.query(sql_update,[id_user],function(err,res){
                                                        if(err){
                                                            callback(new Error("Error de acceso a la base de datos 4"));
                                                        }
                                                        else{
                                                            callback(null,true);
                                                        }
                                                    });
                                                }
                                            }); 
                                        }
                                        else{
                                            let sql_update ="UPDATE question SET counter_vote = counter_vote - 1 WHERE id = ?";
                                            connection.query(sql_update,[id_question],function(err,res){
                                                if(err){
                                                    callback(new Error("Error de acceso a la base de datos 3"));
                                                }
                                                else{
                                                     let sql_update ="UPDATE usuario SET reputation = reputation -2 WHERE id = ?";
                                                        connection.query(sql_update,[id_user],function(err,res){
                                                            if(err){
                                                                callback(new Error("Error de acceso a la base de datos 4"));
                                                            }
                                                            else{
                                                                callback(null,true);
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

}    