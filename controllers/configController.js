/* global console*/
/* global angular*/
"use strict";
angular.module('myApp').controller('configController', function ($scope, $http, $interval, communicator) {

    $scope.sgd = 100;
    $scope.cont = 0;
    $scope.onth = 0;
    communicator.savePesos($scope.sgd/100, $scope.cont/100, $scope.onth/100);
    
    $scope.saveConfig = function () {
        var sgd = $scope.sgd/100;
        var cont = $scope.cont/100;
        var onth = $scope.onth/100;
        if((sgd + cont + onth) === 1){
            communicator.savePesos(sgd, cont, onth); 
        } else {
            alert("Los pesos deben sumar 100");
        }
    };
});