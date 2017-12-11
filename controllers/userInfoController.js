/* global console*/
/* global angular*/
"use strict";
angular.module('myApp').controller('userInfoController', function ($scope, $http, $interval, communicator) {
    $scope.users = [];
    $scope.reviews = [];

    $scope.saveCity = function() {
        communicator.saveCity($scope.city);
        $scope.getUserOfCity($scope.city);
    };

    $scope.getUserOfCity = function(ciudad){
        $http.get("http://172.24.100.111:8080/users").then(
            function (response) {
                console.log(response.data)
                $scope.users = response.data.map(function (i) {
                    return {
                        id : i.user_id,
                        nombre : i.name
                    };
                });
            }
        );
    };

    $scope.getUserinfo = function () {
        communicator.saveUser($scope.selectedUser);
        $http.get("http://172.24.100.111:8080/user?user_id="+$scope.selectedUser+"&city="+$scope.city)
            .then(function(response){
                console.log(response.data)
               $scope.user = {
                    name : response.data.name,
                    revCount : response.data.review_count,
                    yelping_since : response.data.yelping_since,
                    average_stars : response.data.average_stars,
                    is_top_in_city : response.data.is_top_in_city,
                    reviews : response.data.reviews.map(function(r){
                        return {
                            texto : r.text,
                            estrellas : r.stars,
                            fecha : r.date,
                            negocio : r.business.name
                        }
                    }).slice(0,4)
                    };
                    console.log($scope.reviews);
            }, function(response){
                console.log(response+ " error user");
            }
        );
    }
});