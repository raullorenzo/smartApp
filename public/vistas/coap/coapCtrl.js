/**
 * Created by raul on 5/12/16.
 */

//var socket = io ({forceNew: true});
//var socket = io();

angular.module('smartapp').controller('coapCtrl', ['$state', '$http', '$scope', '$window', '$cookies', function ($state, $http, $scope, FlashService, $window, $cookies) {
    $scope.return = function(){
    	$state.go('inicio');
    }
    $scope.exit = function(){
    	$state.go('login');
    }
}]);
