"use strict"

class DAOUsers{

    constructor(pool){
        this.pool= pool;
    }

    //INSERCION USUARIO
    insertUser(email, password,name,img, callback) {  
        this.pool.getConnection(function(err, connection) {
            if(err){
                callback(new Error("Error de conexión a la base de datos"));
            }
            else{
                const e = Date.now();
                const today = new Date(e);
                let sql_select = "SELECT email FROM usuario WHERE email = ?";
                //compruebo si existe usuario
                connection.query(sql_select,[email],function(err,resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));  
                    }
                    else{
                        if(resultado.length>0){
                            callback(new Error("El email ya existe en la base de datos"));
                        }
                        else{
                            let sql = "INSERT INTO usuario(email,password,name,imagen,date) VALUES(?,?,?,?,?)";
                            connection.query(sql,[email,password,name,img,today],function(err,resultado)
                            {
                                if(err){
                                    callback(new Error("Error de acceso a la base de datos"));  
                                }
                                //insercion correcta
                                else{
                                    callback(null,true);
                                }
                        });
                        }
                    }
                });

              
    
         }
        });
    }

    //USUARIO CORRECTO
    isUserCorrect(email,password, callback) {

        this.pool.getConnection(function(err, connection) {
            if (err) { 
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
            connection.query("SELECT * FROM usuario WHERE email = ?" ,
            [email],
            function(err, rows) {
                connection.release(); // devolver al pool la conexión
                if (err) {
                    callback(new Error("Error de acceso a la base de datos"));
                }
                else {
                    //Comprobamos si el email existe
                    if (rows.length === 0) {
                        callback(new Error("El email introducido no existe en la base de datos"));
                    }
                    else {
                        //Si existe el email y la pass es correcta
                        if(rows[0].password === password){
                            callback(null, true);
                        }
                        //en caso de que no exista la pass con ese usuario
                        else{
                            callback(new Error("La contraseña introducida no corresponde al usuario"));
                        }
                    }           
                }
            });
            }
        }
        );
    } 

    //BUSCAR USUARIO POR CORREO
    getUser(email,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"))
                
            }
            else{
                const sql = "SELECT *  FROM usuario WHERE email = ?";
                connection.query(sql,[email], function(err,resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if(resultado.length>0)
                        {            
                            callback(null,resultado[0]);
                        }
                        else{ //es cero
                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
    }

     //TOOODOS USUARIOS
     getAllUsers(callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"))
                
            }
            else{
                const sql = "SELECT *  FROM usuario";
                connection.query(sql, function(err,resultado){
                    connection.release();
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"));
                    }
                    else{
                        if(resultado.length>0)
                        {            
                            let usuarios = [];
                            for(let it of resultado){
                            usuarios[it.id] = {
                                "id" : it.id,
                                "email": it.email,
                                "name": it.name,
                                "img": it.imagen,
                                "date": it.date,
                                "reputation": it.reputation,
                                "publicate_questions" : it.publicate_questions,
                                "publicate_response" : it.publicate_response
                            };
        
                            }
                            
                            resultado = usuarios;
                            callback(null,resultado);
                        }
                        else{ //es cero
                            callback(new Error("No existe el usuario"));
                        }
                    }
                });
            }
        });
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
