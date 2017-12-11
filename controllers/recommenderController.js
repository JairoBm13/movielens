/* global console*/
/* global angular*/
"use strict";

angular.module('myApp').controller('recommenderController', function ($scope, $http, $interval, $log, $location, $anchorScroll, communicator) {
    $scope.search = false;
    var latLons = [{lat : 36.1699, lon : -115.1398},
        {lat : 33.4484, lon : -112.0740}, 
        {lat : 43.6532, lon : -79.3832}];

    var createMarker = function (info, ciudad){
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude,info.longitude)
        });
        marker.content = '<div class="infoWindowContent"><p>'+info.name+'</p><p>'+info.stars+'</p></div>';
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
    }; 

    var createMap = function(ciudad){
        var latLon = null;
        if(ciudad == "las_vegas"){
            latLon = latLons[0];
        } else if (ciudad == "phoenix") {
            latLon = latLons[1];
        } else if (ciudad == "toronto"){
            latLon = latLons[2];
        }
        var mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(latLon.lat, latLon.lon),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.markers = [];
    }

    $scope.get = function () {
        var ciudad = communicator.getCity();
        var usuario = communicator.getUser();
        var pesos = communicator.getPesos();
        var dia = communicator.getDia();
        var hora = communicator.getHora();
        var numRec = 10;
        createMap(ciudad);
        if (usuario && ciudad && pesos) {
            var url = "http://172.24.100.111:8080/recommend";
            var reqBody = {
                user_id : usuario,
                city : ciudad,
                n : numRec,
                w_svd : pesos.svd,
                w_content : pesos.contenido,
                w_text : pesos.texto,
                day : dia,
                hour : hora
            }; 
            
            var recomendationError = function (response) {
                alert("no se pudo generar la recomendación");
            };
            
            var success = function (response) {
                $scope.search = true;
                $scope.negocios = response.data.map(function(n){
                    var negocio = {
                        address : n.address,
                        name : n.name,
                        ranking : n.ranking,
                        attributes : n.attributes,
                        categories : n.categories,
                        latitude : n.latitude,
                        longitude : n.longitude,
                        hours : n.hours,
                        stars : n.stars,
                        poses : n.tips.filter(function(tip){
                            return tip.feeling == "pos";
                        }),
                        negs : n.tips.filter(function(tip){
                            return tip.feeling == "Neg";
                        })
                    };
                    var ranPos = Math.floor(Math.random()*(negocio.poses.length-1));
                    var ranNeg = Math.floor(Math.random()*(negocio.negs.length-1));
                    negocio.poses = negocio.poses.slice(ranPos, ranPos+2);
                    console.log("POS"+ranPos);
                    console.log("NEG"+ranNeg);
                    negocio.negs = negocio.negs.slice(ranNeg, ranNeg+2);
                    return negocio;
                });
                console.log($scope.negocios);
                for(var i = 0; i < $scope.negocios.length; i++){
                    var actual = $scope.negocios[i];
                    createMarker(actual, ciudad);
                }
            }
            $http.post(url, reqBody).then(success, recomendationError);
        } else {
            alert("Indique cantidad de vecinos");
        }
    }

});