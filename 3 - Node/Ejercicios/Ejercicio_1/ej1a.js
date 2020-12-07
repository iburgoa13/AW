"use strict"

const fs = require("fs");

fs.readFile("file.txt",{encoding:"utf-8"},function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log("El archivo ha sido leido");
        fs.writeFile("file.txt",res.replace(/\s+/g,' '),{encoding:"utf-8"},
        err => console.log((err) ? err.message : "Archivo escrito correctamente"));
    }
});