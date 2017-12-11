angular.module('myApp').factory('communicator', ['$rootScope', function($rootScope){

    var user = "";
    var cant = 10;
    var sgdW = 0;
    var contW = 0;
    var onthW = 0;
    var mes = 12;
    var year = 2016;

    return {
        saveUser : function(userId){
            user = userId;
        },
        getUser : function(){
            return user;
        },
        saveCant : function(canti){
            cant = canti;
        },
        getCant : function(){
            return cant;
        },
        savePesos : function(sgd, contenido, onth){
            sgdW = sgd;
            contW = contenido;
            onthW = onth;
        },
        getPesos : function(){

            return {
                sgd : sgdW,
                contenido : contW,
                onth : onthW
            };
        },
        saveMes : function(month){
            mes = month;
        },
        saveYear : function(anio){
            year = anio;
        },
        getMes : function(){
            return mes;
        },
        getYear : function(){
            return year;
        }
    };
}]);