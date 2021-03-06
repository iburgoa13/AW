/*
Práctica 5
Grupo 3
Miembros : Daniela Nicoleta Boldureanu
           Iker Burgoa Muñoz
*/ 


"use strict"

class DAOUsers{

    constructor(pool){
        this.pool= pool;
    }

    //USUARIO CORRECTO
    isUserCorrect(email, password, callback) {

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM user WHERE email = ? AND password = ?" ,
            [email,password],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    if (rows.length === 0) {
                        callback(new Error("Dirección de correo y/o contraseña no válidos"));
                    }
                    else {
                        callback(null, true);
                    }           
                }
            });
            }
        }
        );
    } 


    getUserImageName(email,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"))
                
            }
            else{
                const sql = "SELECT img  FROM user WHERE email = ?";
                connection.query(sql,[email], function(err,resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if(resultado.length>0)//tenemos img{
                        {            
                            callback(null,resultado[0].img);
                        }
                        else{ //es cero
                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }
    
}

module.exports = DAOUsers;

