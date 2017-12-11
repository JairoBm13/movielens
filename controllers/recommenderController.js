/* global console*/
/* global angular*/
"use strict";

angular.module('myApp').controller('recommenderController', function ($scope, $http, $interval, $log, $location, $anchorScroll, communicator) {
    $scope.search = false;
    $scope.recomendaciones = [];
    $scope.get = function () {
        var usuario = communicator.getUser();
        var pesos = communicator.getPesos();
        var year = communicator.getYear();
        var mes = communicator.getMes();
        var numRec = communicator.getCant();
        if (usuario && pesos && numRec && mes && year) {
            var url = "http://172.24.100.111:8080/recommend";
            var reqBody = {
                userId : usuario,
                n : numRec,
                w_sgd : pesos.sgd,
                w_content : pesos.contenido,
                w_ontological : pesos.onth,
                year : year,
                month : mes
            }; 
            console.log(reqBody);
            var recomendationError = function (response) {
                console.log(response);
                alert("no se pudo generar la recomendación");
            };
            
            var success = function (response) {
                console.log(response);
                $scope.search = true;
                if(mes == 12){
                    communicator.saveMes(1);
                    communicator.saveYear(year+1);
                } else {
                    communicator.saveMes(mes+1);
                    communicator.saveYear(year);
                }
                var recomendacion = {
                    year : year,
                    month : mes,
                    reco : response.data
                };
                $scope.recomendaciones.push(recomendacion);
            }
            $http.post(url, reqBody).then(success, recomendationError);
        } else {
            alert("Indique cantidad de vecinos");
        }
    }

});