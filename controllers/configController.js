/* global console*/
/* global angular*/
"use strict";
angular.module('myApp').controller('configController', function ($scope, $http, $interval, communicator) {

    $scope.svd = 100;
    $scope.cont = 0;
    $scope.text = 0;
    communicator.savePesos(svd/100, cont/100, text/100);
    
    
    $scope.saveConfig = function () {
        var svd = $scope.svd/100;
        var cont = $scope.cont/100;
        var text = $scope.text/100;
        var dia = $scope.day;
        var hora = parseInt($scope.hora);
        if((svd + cont + text) === 1){
            communicator.savePesos(svd, cont, text);
            communicator.saveDia(dia);
            communicator.saveHora(hora);  
        } else {
            alert("Los pesos deben sumar 100");
        }
    };
});