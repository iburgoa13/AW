"use strict"

    function fibAux(n) {

        if (n === 0) {
            return 0;
        } else if (n === 1) {
            return 1;
        } else {
            return fibAux(n-1) + fibAux(n-2);
        }
    }
    function fib(n) {
        console.assert(typeof(n) === "number", `${n} is not a number`);
        return fibAux(n);
    }

    module.exports = fib;
