/**
 * Created by raul on 5/12/16.
 */

var socket = io ({forceNew: true});

angular.module('smartapp').controller('distCtrl', ['$state', '$http', '$scope', '$window', '$cookies', function ($state, $http, $scope, FlashService, $window, $cookies) {
    socket.emit('Conectado observer dist');
    socket.on('lectura', function (data){
        console.log("Dato: ", data.valor);
        $scope.$apply(function (){
            $scope.dist = data.valor;
        });
    });
    $scope.return = function(){
    	$state.go('inicio');
    }
    $scope.exit = function(){
    	$state.go('login');
    }
}]);
