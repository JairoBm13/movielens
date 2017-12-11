angular.module('myApp').factory('communicator', ['$rootScope', function($rootScope){

    var user = "";
    var ciudad = null;
    var svdW = 0;
    var contW = 0;
    var textW = 0;
    var dia = "";
    var hora = -1;

    return {
        saveUser : function(userId){
            user = userId;
        },
        saveCity : function(city){
            ciudad = city;
        },
        getCity : function(){
            return ciudad;
        },
        getUser : function(){
            return user;
        },
        getVecinos : function(){
            console.log("vecinos" + vecinos);
            return vecinos;
        },
        savePesos : function(svd, contenido, texto){
            svdW = svd;
            contW = contenido;
            textW = texto;
        },
        getPesos : function(){
            return {
                svd : svdW,
                contenido : contW,
                texto : textW
            };
        },
        saveHora : function(hour){
            hora = hour;
        },
        saveDia : function(day){
            dia = day;
        },
        getHora : function(){
            return hora;
        },
        getDia : function(){
            return dia;
        }
    };
}]);