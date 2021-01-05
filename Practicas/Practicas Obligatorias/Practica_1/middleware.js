
const controllerUser = require("./controllers/controllerUsuario");
function comprobarUsuario(request, response, next) {
    if (request.session.currentUser) {
        controllerUser.comprobarUsuario(request,response,next);   
    }
    else {
        response.status(403).redirect("/login");
    }
}

module.exports = {
    comprobarUsuario
}