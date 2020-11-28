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
                        callback(null, false); //no está el usuario con el password proporcionado
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
                callback(new Error("Error al obtener la conexion a la base de"))
                
            }
            else{
                const sql = "SELECT img  FROM user WHERE email = ?";
                connection.query(sql,[email], function(err,resultado){
                    connection.release();
                    if(err){
                        callback(err,null);
                        console.log(`Error de acceso a la base de datos: ${err.message}`);
                    }
                    else{
                        if(resultado.length>0)//tenemos img{
                        {            
                            callback(null,resultado[0].img);
                        }
                        else{ //es cero
                            callback(new Error("El usuario no existe."));
                        }
                    }
                });
            }
        });
    }
    
}

module.exports = DAOUsers;


