/**
 * Created by raul on 5/12/16.
 */

//var socket = io ({forceNew: true});

angular.module('smartapp').controller('inicioCtrl', ['$state', '$http', '$scope', '$window', '$cookies', function ($state, $http, $scope, $window, $cookies) {
    $scope.temperatura = function(){
    	$state.go('temp');
    }
    $scope.distancia = function(){
    	$state.go('dist');
    }
    $scope.luminosidad = function(){
    	$state.go('luz');
    }
    $scope.coap = function(){
        $state.go('coap');
    }
    $scope.exit = function(){
    	$state.go('login');
    }
}]);
