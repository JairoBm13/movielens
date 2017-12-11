/* global console*/
/* global angular*/
"use strict";
angular.module('myApp').controller('mainController', function($scope, $http, $interval, $log, $location, $anchorScroll, communicator){

    var countD = function (){
        $interval(function(){

        }, 1000, $scope.something);
    }

    $scope.message = "hello";

    // funciones para usar con ng-click
    $scope.search = function(param){

    };
       
    $scope.get = function()
    {
        var success = function(response){
            $scope.recommendations = response.data;
            $scope.artid = response.data[0].artid;
            response.data[0].artname;
            console.log(response.data[0].artname);
        };
    
        var recomendationError = function(response){
            //do error
        };

        $http.get("http://172.24.100.111:8080/MusicRecommenderREST/rest/users/5/recommendations")
        .then(success, recomendationError);
        
    }
    //$scope.get();
});