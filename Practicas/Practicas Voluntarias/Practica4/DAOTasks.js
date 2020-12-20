/*
Práctica 4
Grupo 03
Miembros: Daniela Nicoleta Boldureanu
          Iker Burgoa Muñoz 
        
*/ 


"use strict";

class DAOTasks {
 constructor(pool) {  
     this.pool = pool;
}
 
 getAllTasks(email, callback) {  
    this.pool.getConnection(function(err, connection) {
        if (err) { 
            callback(new Error("Error de conexión a la base de datos"));
        }
        else {
        const query = "SELECT * FROM task  JOIN tag ON (taskId = id) WHERE user = ?";
        connection.query(query ,[email],
        function(err, rows) {
            connection.release(); // devolver al pool la conexión
            if (err) {
                callback(new Error("Error de acceso a la base de datos"));
            }
            else {
                if (rows.length === 0) {
                    callback(null, false); //no está el usuario con el password proporcionado
                }
                else {

                    let tareas=[],  tag=[];
                    for(let it of rows){
                      
                        if(!tareas[it.id])
                            tareas[it.id]={
                                "id": it.id,
                                "text": it.text,
                                "done": it.done,
                                "tags": []
                            };   

                        if(it.tag) tareas[it.id].tags.push(it.tag);      
   
                    }
                    
                    rows = tareas;
                    callback(null,rows);
                
                }           
            }
        });
        }
    }
    );
   }
 
   insertTask(email, task, callback) {  
    this.pool.getConnection(function(err, connection) {
        if(err){
            callback(new Error("Error de conexión a la base de datos"));
        }
        else{
            let sql = "INSERT INTO task(user,text,done) VALUES(?,?,?)";
            connection.query(sql,[email,task.text,task.done],function(err,resultado)
            {
                connection.release();
                if(err){
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else{
                    let sql2= "INSERT INTO tag (taskId,tag) values ?";
                    let array=[];

                    task.tags.forEach(n => {
                        array.push([resultado.insertId,n]);
                    });
                    connection.query(sql2,[array],function(error,total){
                        if(error){
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


   
 markTaskDone(idTask, callback) {  
    this.pool.getConnection(function(err, connection) {
        if(err) {
            callback(new Error("Error de conexión a la base de datos"));
        }
        let udpate = "UPDATE task SET done = 1 WHERE id=?";
        connection.query(udpate,[idTask],function(error,resultado){
            connection.release();
            if(error){
                callback(new Error("Error de acceso a la base de datos"));
            }
            else callback(null);
        });
    });
   }


    deleteCompleted(email, callback) {  
            this.pool.getConnection(function(err,connection){
                if(err){
                    callback(new Error("Error de conexión a la base de datos"));
                }
                else{
                    let sql = "DELETE FROM task WHERE user = ? AND done = 1;";
                    connection.query(sql,[email],function(err,res){
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
}

module.exports = DAOTasks;
