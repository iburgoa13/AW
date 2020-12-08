"use strict"

class DAOQuestionResponse{
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
                                }
                            });
                        });
                     
                        
                      
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
                }
            });
            }
        }
        );
    }

}