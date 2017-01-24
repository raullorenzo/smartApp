/**
 * Created by raul on 5/12/16.
 */

const CHARIOT = 'coap://chariot.';
const SOURCE  = 'c352';
const DEST   = '.local/';
const SENSOR  = 'sensors/tmp275-c?get';

var intents = 0;


angular.module('smartapp').controller('coapCtrl', function ($state, $stateParams, $http, $scope, $rootScope, $window, $cookies, $interval) {
    
    var promise26;
    var promise27;
    var promise28;
    var promise29;
    var count = 0;
    var status_error = 0;

    $scope.return = function(){
        $state.go('inicio');
    }
    $scope.exit = function(){
    	$state.go('login');
    }
    $scope.reload = function(){
        $interval.cancel(promise26);
        promise26 = undefined;
        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;
        intents++;
        console.log('Reloads: '+intents);
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

	
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        var status = 'Sorry, but your browser doesn\'t ' + 'support WebSockets.';
        $scope.$apply(function(){
            $scope.status = status;
            $scope.result = 'Push reload button';
            $scope.location = 'Location: --';
            $scope.contador = ' Lap number: -- ';
            $scope.tiempo = ' Response time: --';
        });  
    }

    // open connection--overwrite default string for your value.
    var chariot = "ws://192.168.1.175:1337";
	var connection = new WebSocket(chariot);
    console.log(connection);

 
    connection.onopen = function () {
        console.log('Server Status On');

        // first we want users to enter their names
        var status = 'Server Status On';
        $scope.$apply(function(){
            $scope.status = status;
            $scope.result = '-------';
            $scope.location = 'Location: --';
            $scope.contador = ' Lap number: -- ';
            $scope.tiempo = ' Response time: --';
        });
        
    };

    connection.onerror = function (error) {
        var result_loc2 = 'The socket server is down, please reset the server';
        // just in case there were some problems with connection...
        var status = 'Sorry, but there\'s some problem with your ' 
                   + 'connection or the server is down.';
        $interval.cancel(promise26);
        promise26 = undefined;
        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;
        $scope.$apply(function(){
                if (intents > 5){
                    $scope.status = status;
                    $scope.result = result_loc2;
                    $scope.location = 'Location: --';
                    $scope.contador = ' Lap number: -- ';
                    $scope.tiempo = ' Response time: --';
                    console.log('status error 2');
                }else{
                    $scope.status = status;
                    $scope.result = 'Push reload button';
                    $scope.location = 'Location: --';
                    $scope.contador = ' Lap number: -- ';
                    $scope.tiempo = ' Response time: --';
                }
            });  
    };

    // most important part - incoming messages
    connection.onmessage = function (event) {
        var aux = event.data;
        if (aux.length < 15){
            console.log(aux);
            $scope.$apply(function(){
                $scope.tiempo = ' - Response Time: '+aux;
            });
        }else{
            var location = event.data.substring(0,13);
            var temp = event.data;
            result = event.data.substring(35,39);
            $scope.$apply(function(){
                $scope.result = result+' ºC';
                $scope.location = 'Location: '+location;
                $scope.contador = ' - Loop: '+i;
            });
            console.log('Lap number: '+i);
            console.log(result);
            console.log(temp);
        }
    };

    /**
     * Send mesage when user presses the buttons
     */

    
    $scope.chariot26 = function(){
        i = 0;
        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;

        repeat26 = function(){
            var msg = CHARIOT+SOURCE+6+DEST+SENSOR;
            console.log(msg);
            connection.send(msg);
            i++;
        }
        repeat26();
        promise26 = $interval(function() 
        { 
            repeat26();
        }, 
        10000);
        console.log(promise26);
    }

    $scope.chariot27 = function(){
        i = 0;
        $interval.cancel(promise26);
        promise26 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;

        repeat27 = function(){
            var msg= CHARIOT+SOURCE+7+DEST+SENSOR;
            console.log(msg);
            connection.send(msg);
            i++;
        }
        repeat27();
        promise27 = $interval(function() 
        { 
            repeat27();
        }, 
        10000);  
        console.log(promise27);
    }

    $scope.chariot28 = function(){
        i = 0;
        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise26);
        promise26 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;

        repeat28 = function(){
            var msg= CHARIOT+SOURCE+8+DEST+SENSOR;
            console.log(msg);
            connection.send(msg);
            i++;
        }
        repeat28();
        promise28 = $interval(function() 
        { 
            repeat28();
        }, 
        10000);
        console.log(promise28);
    }

    $scope.chariot29 = function(){
        i = 0;
        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise26);
        promise26 = undefined;

        repeat29 = function(){
            var msg= CHARIOT+SOURCE+9+DEST+SENSOR;
            console.log(msg);
            connection.send(msg);
            i++;
        }
        repeat29();
        promise29 = $interval(function() 
        { 
            repeat29();
        }, 
        10000);
        console.log(promise29);
    }


    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 30 seconds then show some error message to notify the user that
     * something is wrong. We're talking to an Arduino WoT!
     */

    setInterval(function() {
        var result_loc1 = 'The socket server is down, please reset the server';
        if (connection.readyState !== 1) {
            var status = 'Error ' 
                        + 'Unable to communicate ' 
                        + 'with the WebSocket server.';
            $scope.$apply(function(){
                if (intents > 5){
                    $scope.status = status;
                    $scope.result = result_loc1;
                    $scope.location = 'Location: --';
                    $scope.contador = ' Lap number: -- ';
                    $scope.tiempo = ' Response time: --';
                    console.log('status error 1');
                }else{
                    $scope.status = status;
                    $scope.result = 'Push reload button';
                    $scope.location = 'Location: --';
                    $scope.contador = ' Lap number: -- ';
                    $scope.tiempo = ' Response time: --';
                }
            });  
        }
    }, 60000);
});
