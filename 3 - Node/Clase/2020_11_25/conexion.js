//mismos pasos siempre
//primero sincrono
//las demas asincronas
/*pool de conexiones ==> contenedor con conexiones de bbdd sin necesidad de crear nuevas, usamos y liberamos */

"use strict"

const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mibd",
    multipleStatements:true //esto es para poner muchas consultas select...;insert...;delete ...;
    //OJO si la consulta es parametrica esto no funciona
    //USAR SIEMPRE CONSULTAS PARAMETRICAS
});

 //SELECT
 /*
pool.getConnection(function(err,connection){
    if(err){
        console.log("Error al obtener la conexion: ${err.message}");
    }
    else{
       
        connection.query("SELECT Nombre , Apellidos FROM Contactos",
        function(err,filas){
            //siempre se pone esto antes SIEMPRE
            connection.release();
            //pool.end();//cerramos y para el terminal se cierra conexion
            //eso es de ejemplo el pool nunca se debe cerrar siempre CTRL + C
            if(err){
                console.log("Error en la consulta a la base de datos");
            }
            else{
                filas.forEach(function(fila){
                    console.log(`${fila.Nombre}  ${fila.Apellidos}`);
                    
                });
            }
        });
        
    }
});*/
//INSERT
/*
pool.getConnection(function(err,connection){
    if(err)
    {
        console.log(`Error al conectar la conexion: ${err.message}`)
    }
    else{
        const sql = "INSERT INTO Contactos(Nombre,Apellidos) VALUES ('Diego','Maradona')";
        connection.query(sql,function(err,resultado){
            connection.release();
            if(err){
                console.log("error de insercion: " + err);
            }
            else{
                console.log(resultado.insertId);
                console.log(resultado.affectedRows);
            }
        })
    }
})*/
//select con id
/*
pool.getConnection(function(err,connection){
    if(err)
    {
        console.log(`Error al conectar la conexion: ${err.message}`)
    }
    else{
        var id = 1;
        const sql = `SELECT Nombre,Apellidos FROM Contactos WHERE ID =${id}`;// OR TRUE`;
        //expresion id = id or true es true entonces saca todas las filas
        connection.query(sql,function(err,fila){
            connection.release();
            if(err){
                console.log("error de insercion: " + err);
            }
            else{
                console.log(fila);
               // console.log(resultado.insertId);
              //  console.log(resultado.affectedRows);
            }
        })
    }
})*/

//select con id
/*
pool.getConnection(function(err,connection){
    if(err)
    {
        console.log(`Error al conectar la conexion: ${err.message}`)
    }
    else{
        //solo se puede hacer una consulta
        var id = "1; DROP TABLE if exists telefonos;";


        const sql = `SELECT Nombre,Apellidos FROM Contactos WHERE ID = ${id}`;// OR TRUE`;
        console.log(sql);
        //expresion id = id or true es true entonces saca todas las filas
        connection.query(sql,function(err,fila){
            connection.release();
            if(err){
                console.log("error de insercion: " + err);
            }
            else{
                console.log(fila);
               // console.log(resultado.insertId);
              //  console.log(resultado.affectedRows);
            }
        })
    }
})*/
//select parametrico
pool.getConnection(function(err,connection){
    if(err)
    {
        console.log(`Error al conectar la conexion: ${err.message}`)
    }
    else{
        //solo se puede hacer una consulta
        var id = "1; DROP TABLE if exists telefonos;";


        const sql = `SELECT Nombre,Apellidos FROM Contactos WHERE ID = ?`;// OR TRUE`;
        //expresion id = id or true es true entonces saca todas las filas
        connection.query(sql,[id],function(err,fila){
            connection.release();
            if(err){
                console.log("error de insercion: " + err);
            }
            else{
                console.log(fila);
               // console.log(resultado.insertId);
              //  console.log(resultado.affectedRows);
            }
        })
    }
})