/* global console*/
/* global angular*/
"use strict";
(function(){
    
    var app = angular.module('myApp');
    var mainController = function($scope, $http, $interval, $log, $location, $anchorScroll, communicator, $routeParams){
    
        var success = function(response){
            //do something
            $location.hash("someID");
            $anchorScroll();
            $location.path("/another/"+"param");
        };
    
        var error = function(response){
            //do error
        };

        var countD = function (){
            $interval(function(){

            }, 1000, $scope.something);
        }
    
        $scope.message = "hello";

        // funciones para usar con ng-click
        $scope.search = function(param){

        };
    
        //$http("url").then(success, error);
    };

    app.controller('anController', ["$scope", "$http", mainController]);
    
}());