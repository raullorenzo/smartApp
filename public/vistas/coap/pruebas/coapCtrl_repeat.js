/**
 * Created by raul on 5/12/16.
 */

const CHARIOT = 'coap://chariot.';
const SOURCE  = 'c352';
const DEST    = '.local/';
const SENSOR  = 'sensors/tmp275-c?get';


angular.module('smartapp').controller('coapCtrl', function ($state, $stateParams, $http, $scope, $rootScope, $window, $interval, $location) {
    
    var promise26;
    var promise27;
    var promise28;
    var promise29;
    var i;

    $scope.return = function(){
        console.log('function return');
        promises();
        $state.go('inicio');
    }
    $scope.exit = function(){
        console.log('function exit');
        promises();
    	$state.go('login');
    }
    $scope.reload = function(){
        console.log('function reload');
        // promises();
        // $state.transitionTo($state.current, $stateParams, {
        //     reload: true,
        //     inherit: false,
        //     notify: true
        // });
        promises();
        $location.path('/coap');
        $window.location.reload();
      
    }

    function promises(){
        console.log('function promises');
        if (angular.isDefined(promise26)) {
            $interval.cancel(promise26);
            promise26 = undefined;
        }
        if (angular.isDefined(promise27)) {
            $interval.cancel(promise27);
            promise27 = undefined;
        }
        if (angular.isDefined(promise28)) {
            $interval.cancel(promise28);
            promise28 = undefined;
        }
        if (angular.isDefined(promise29)) {
            $interval.cancel(promise29);
            promise29 = undefined;
        }
        // $interval.cancel(promise26);
        // promise26 = undefined;
        // $interval.cancel(promise27);
        // promise27 = undefined;
        // $interval.cancel(promise28);
        // promise28 = undefined;
        // $interval.cancel(promise29);
        // promise29 = undefined;
        console.log('promise26: '+angular.isDefined(promise26));
        console.log('promise27: '+angular.isDefined(promise27));
        console.log('promise28: '+angular.isDefined(promise28));
        console.log('promise29: '+angular.isDefined(promise29));
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
            console.log('Error. status error 1');
        });  
    }

    // open connection--overwrite default string for your value.
    var chariot = "ws://192.168.0.175:1337";
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
        // just in case there were some problems with connection...
        var status = 'Sorry, but there\'s some problem with your ' 
                   + 'connection or the server is down.';

        $scope.$apply(function(){
            $scope.status = status;
            $scope.result = 'Push reload button';
            $scope.location = 'Location: --';
            $scope.contador = ' Lap number: -- ';
            $scope.tiempo = ' Response time: --';
            console.log('Error. status error 2');
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
        if (angular.isDefined(promise27)) {
            $interval.cancel(promise27);
            promise27 = undefined;
        }
        if (angular.isDefined(promise28)) {
            $interval.cancel(promise28);
            promise28 = undefined;
        }
        if (angular.isDefined(promise29)) {
            $interval.cancel(promise29);
            promise29 = undefined;
        }
        // $interval.cancel(promise27);
        // promise27 = undefined;
        // $interval.cancel(promise28);
        // promise28 = undefined;
        // $interval.cancel(promise29);
        // promise29 = undefined;

        repeat26 = function(){
            var msg = CHARIOT+SOURCE+6+DEST+SENSOR;
            console.log(msg);
            console.log('isDefined26: '+angular.isDefined(promise26));
            console.log('promise26: '+promise26);
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
        if (angular.isDefined(promise26)) {
            $interval.cancel(promise26);
            promise26 = undefined;
        }
        if (angular.isDefined(promise28)) {
            $interval.cancel(promise28);
            promise28 = undefined;
        }
        if (angular.isDefined(promise29)) {
            $interval.cancel(promise29);
            promise29 = undefined;
        }
        // $interval.cancel(promise26);
        // promise26 = undefined;
        // $interval.cancel(promise28);
        // promise28 = undefined;
        // $interval.cancel(promise29);
        // promise29 = undefined;

        repeat27 = function(){
            var msg= CHARIOT+SOURCE+7+DEST+SENSOR;
            console.log(msg);
            console.log('isDefined27: '+angular.isDefined(promise27));
            console.log('promise27: '+promise27);
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
        if (angular.isDefined(promise27)) {
            $interval.cancel(promise27);
            promise27 = undefined;
        }
        if (angular.isDefined(promise26)) {
            $interval.cancel(promise26);
            promise26 = undefined;
        }
        if (angular.isDefined(promise29)) {
            $interval.cancel(promise29);
            promise29 = undefined;
        }
        // $interval.cancel(promise27);
        // promise27 = undefined;
        // $interval.cancel(promise26);
        // promise26 = undefined;
        // $interval.cancel(promise29);
        // promise29 = undefined;

        repeat28 = function(){
            var msg= CHARIOT+SOURCE+8+DEST+SENSOR;
            console.log(msg);
            console.log('isDefined28: '+angular.isDefined(promise28));
            console.log('promise28: '+promise28);
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
        if (angular.isDefined(promise27)) {
            $interval.cancel(promise27);
            promise27 = undefined;
        }
        if (angular.isDefined(promise28)) {
            $interval.cancel(promise28);
            promise28 = undefined;
        }
        if (angular.isDefined(promise26)) {
            $interval.cancel(promise26);
            promise26 = undefined;
        }
        // $interval.cancel(promise27);
        // promise27 = undefined;
        // $interval.cancel(promise28);
        // promise28 = undefined;
        // $interval.cancel(promise26);
        // promise26 = undefined;

        repeat29 = function(){
            var msg= CHARIOT+SOURCE+9+DEST+SENSOR;
            console.log(msg);
            console.log('isDefined29: '+angular.isDefined(promise29));
            console.log('promise29: '+promise29);
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

    $scope.sound28_on = function(){
        promises();
        var msg='coap://chariot.c3528.local/arduino/digital?put&pin=13&val=1';
        console.log(msg);
        connection.send(msg);
    }

    $scope.sound28_off = function(){
        promises();
        var msg='coap://chariot.c3528.local/arduino/digital?put&pin=13&val=0';
        console.log(msg);
        connection.send(msg);
    }

    $scope.light28_on = function(){
        promises();
        var msg='coap://chariot.c3528.local/arduino/digital?put&pin=10&val=1';
        console.log(msg);
        connection.send(msg);
    }

    $scope.light28_off = function(){
        promises();
        var msg='coap://chariot.c3528.local/arduino/digital?put&pin=10&val=0';
        console.log(msg);
        connection.send(msg);
    }

    function read_light_state(){
        promises();
        var msg='coap://chariot.c3528.local/arduino/digital?get&pin=10';
        console.log(msg);
        connection.send(msg);
    }

    function read_sound_state(){
        promises();
        var msg='coap://chariot.c3528.local/arduino/digital?get&pin=6';
        console.log(msg);
        connection.send(msg);
    }

    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 30 seconds then show some error message to notify the user that
     * something is wrong. We're talking to an Arduino WoT!
     */

    setInterval(function() {
        if (connection.readyState !== 1) {
            var status = 'Error ' 
                        + 'Unable to communicate ' 
                        + 'with the WebSocket server.';
            $scope.$apply(function(){
                $scope.status = status;
                $scope.result = 'Restart Server';
                $scope.location = 'Location: --';
                $scope.contador = ' Lap number: -- ';
                $scope.tiempo = ' Response time: --';
                console.log('Error. status error 3');
            });  
        }
    }, 30000);
});
