"use strict"
$(function(){
    let $h1 = $("h1");
    let $p = $("p").children("a");
    console.log($h1);
    console.log($p.length);
    console.log($p);
    let $p1 = $("p").children("a.imp1");
    console.log($p1.length);
    console.log($p1);
});