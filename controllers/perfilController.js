/* global console*/
/* global angular*/
"use strict";

angular.module('myApp').controller('perfilController', function ($scope, $http, $interval, $log, $location, $anchorScroll, communicator) {

    $scope.usuarioId = communicator.getUser();

    $scope.getUserinfo = function () {

        var successInfoUser = function (response) {

            if ($scope.usuarioId != -1) {
                $scope.usuarioId = response.data.userid;

                if (response.data.gender == "m") {
                    $scope.usuarioGenero = "male";
                } else if (response.data.gender == "f") {
                    $scope.usuarioGenero = "female";
                } else {
                    $scope.usuarioGenero = response.data.gender;
                }
                $scope.usuarioPais = response.data.country;
                $scope.usuarioRegistro = response.data.registered;
            }
        };

        var errorInfoUser = function (response) {
            console.log("error");
        };

        $http.get("http://172.24.100.111:8080/MusicRecommenderREST/rest/users/" + $scope.usuarioId)
            .then(successInfoUser, errorInfoUser);

    }
    $scope.getUserinfo();


    $scope.getTop = function () {

        var errorPerfilTop = function (response) {
            //do error
        };

        var successPerfilTop = function (response) {
            //do error
            var arrayTopUsuario = response.data.sort(function (art1, art2) {
                return art2.evaluation - art1.evaluation;
            }).map(function (i) {
                var nuevo = {
                    itemid: i.itemid,
                    artname: i.artname,
                    playcounts: i.playcounts,
                    evaluation: i.evaluation
                };
                return nuevo;
            });

            if (arrayTopUsuario.length > 10) {
                $scope.top10UserArtist = arrayTopUsuario.slice(0, 10);
            } else {
                $scope.top10UserArtist = arrayTopUsuario;
            }
            console.log($scope.top10UserArtist);
        };

        $http.get("http://172.24.100.111:8080/MusicRecommenderREST/rest/users/5/activity")
            .then(successPerfilTop, errorPerfilTop);

    }
    $scope.getTop();

});