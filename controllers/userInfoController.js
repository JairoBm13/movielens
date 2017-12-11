/* global console*/
/* global angular*/
"use strict";
angular.module('myApp').controller('userInfoController', function ($scope, $http, $interval, communicator) {
    $scope.users = [];
    $scope.reviews = [];

    $scope.getUserOfCity = function(){
        $http.get("http://172.24.100.111:8080/users").then(
            function (response) {
                console.log(response.data[1])
                $scope.users = response.data.map(function (i) {
                    return {
                        id : i.userId,
                        ratings : i.rating
                    };
                });
            }
        );
    };
    $scope.getUserOfCity();
    $scope.saveUserinfo = function () {
        communicator.saveUser(Number($scope.selectedUser));
    }
    $scope.saveCantinfo = function () {
        communicator.saveCant(Number($scope.selectedCant));
    }
});