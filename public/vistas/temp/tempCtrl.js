/**
 * Created by raul on 5/12/16.
 */

var socket = io ({forceNew: true});
//var socket = io();

angular.module('smartapp').controller('tempCtrl', ['$state', '$http', '$scope', '$window', '$cookies', function ($state, $http, $scope, FlashService, $window, $cookies) {
    
	socket.emit('Conectado observer temp');
    socket.on('lectura', function (data){
        console.log("Dato: ", data.valor);
        $scope.$apply(function (){
            $scope.temp = data.valor;
        });
    });
    $scope.return = function(){
    	$state.go('inicio');
    }
    $scope.exit = function(){
    	$state.go('login');
    }

}]);
