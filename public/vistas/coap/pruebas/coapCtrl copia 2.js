/**
 * Created by raul on 5/12/16.
 */

//var socket = io ({forceNew: true});
//var socket = io();
var promise26;
var promise27;
var promise28;
var promise29;

angular.module('smartapp').controller('coapCtrl', function ($state, $http, $scope, $rootScope, $window, $cookies, $interval) {
    
    

    $scope.return = function(){
    	$state.go('inicio');
    }
    $scope.exit = function(){
    	$state.go('login');
    }

    //var result;
    //var content = $('#content');
    // var input = $('#input');
    // var status = $('#status');

    // my color assigned by the server
    //var myColor = true;
    // my name sent to the server
    //var myName = true;
	
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
	
    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        // content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
        //                             + 'support WebSockets.'} ));
        // input.hide();
        // $('span').hide();
        // return;

        var status = 'Sorry, but your browser doesn\'t ' + 'support WebSockets.';
        $scope.status = status;
    }

    // open connection--overwrite default string for your value.
	  // var chariot = prompt("Please enter Chariot WS server: ", "ws://192.168.1.115:1337");
    var chariot = "ws://192.168.0.175:1337";
	var connection = new WebSocket(chariot);
    console.log(connection);

 
    connection.onopen = function () {
        console.log('Server Status On');
        // first we want users to enter their names
        //input.removeAttr('disabled');
        var status = 'Server Statu On';
        $scope.$apply(function(){
            $scope.status = status;
        });
        
    };

    connection.onerror = function (error) {
        // just in case there were some problems with connection...
        // content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
        //                             + 'connection or the server is down.' } ));
        var result = 'Sorry, but there\'s some problem with your ' 
                   + 'connection or the server is down.';
        $scope.result = result;
    };

    // most important part - incoming messages
    connection.onmessage = function (event) {
      // $scope.$apply(function(){
      //       $scope.result = event.data;
      //   });
      // console.log($scope.result);
		//input.removeAttr('disabled'); // let the user write another message
		//content.prepend('<p> ' +
        //     + 'Arduino IoT: ' + event.data + '</p>');
		//content.prepend('<p> ' + event.data + '</p>');
   
        // var result = event.data;
        // if (event.data == 'chariot.c3526.local: 2.05 CONTENT  25.7(C)'){
        //     console.log('OK');
        //     var aux = event.data
        //     $scope.result = aux;
        // }else{
        //     console.log('NO OK');
        // }
        // textoAreaDividido = textoArea.split(" ");
        // numeroPalabras = textoAreaDividido.length;
        // while (event){
        //     var aux = event.data.substring(35,39);
        //     var numaux = aux.length;
        //     if (numaux == 4){
        //         $scope.result = aux;
        //     }
        //     return;
        // }
        var aux = event.data;
        //var result;
        if (aux.length < 15){
            console.log(aux);
            $scope.$apply(function(){
                $scope.tiempo = ' || Response Time: '+aux;
            });
        }else{
            var temp = event.data;
            result = event.data.substring(35,39);
            //addMessage(result);
            $scope.$apply(function(){
                $scope.result = result+' ºC';
            });
            console.log(result);
            console.log(temp);
        }
        


        //$scope.result = result;
        
        //console.log(result);
        // console.log('----------------');
         // console.log('$scope: ',$scope.result);
        // console.log('----------------');
        // console.log('event: '+JSON.stringify(event.data));
        // console.log('----------------');
        // console.profile();
        // console.trace();
        //addMessage();
        // var result = event.data;
        // $scope.result = result;

        //console.log(result);
    };

    /**
     * Send mesage when user presses Enter key
     */
    //$interval($scope.chariot26, 1000)
    

    $scope.chariot26 = function(){

        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;

        repeat26 = function(){
            var msg = 'coap://chariot.c3526.local/sensors/tmp275-c?get';
            console.log(msg);
            connection.send(msg);
        }
        repeat26();
        promise26 = $interval(function() 
        { 
            repeat26();
        }, 
        5000);
        console.log(promise26);
    }

    $scope.chariot27 = function(){

        $interval.cancel(promise26);
        promise26 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;

        repeat27 = function(){
            var msg= 'coap://chariot.c3527.local/sensors/tmp275-c?get';
            console.log(msg);
            connection.send(msg);
        }
        repeat27();
        promise27 = $interval(function() 
        { 
            repeat27();
        }, 
        5000);  
        console.log(promise27);
    }

    $scope.chariot28 = function(){

        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise26);
        promise26 = undefined;
        $interval.cancel(promise29);
        promise29 = undefined;

        repeat28 = function(){
            var msg= 'coap://chariot.c3528.local/sensors/tmp275-c?get';
            console.log(msg);
            connection.send(msg);
        }
        repeat28();
        promise28 = $interval(function() 
        { 
            repeat28();
        }, 
        5000);
        console.log(promise28);
    }

    $scope.chariot29 = function(){

        $interval.cancel(promise27);
        promise27 = undefined;
        $interval.cancel(promise28);
        promise28 = undefined;
        $interval.cancel(promise26);
        promise26 = undefined;

        repeat29 = function(){
            var msg= 'coap://chariot.c3529.local/sensors/tmp275-c?get';
            console.log(msg);
            connection.send(msg);
        }
        repeat29();
        promise29 = $interval(function() 
        { 
            repeat29();
        }, 
        5000);
        console.log(promise29);
    }
   //  input.keydown(function(e) {
   //      if (e.keyCode === 13) {
   //          var msg = $(this).val();
   //          if (!msg) {
   //              return;
   //          }
   //          // send the message as an ordinary text
			// content.prepend('<p> ' + msg + '</p>');
   //          connection.send(msg);
   //          $(this).val('');
   //          // disable the input field to make the user wait until server
   //          // sends back response
   //          //input.attr('disabled', 'disabled');

   //          // we know that the first message sent from a user their name
   //          //if (myName === false) {
   //          //    myName = msg;
   //          //}
   //      }
   //  });

    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 30 seconds then show some error message to notify the user that
     * something is wrong. We're talking to an Arduino WoT!
     */

    setInterval(function() {
        if (connection.readyState !== 1) {
            // status.text('Error');
            // input.attr('disabled', 'disabled').val('Unable to communicate '
            //                                      + 'with the WebSocket server.');
            var status = 'Error' 
                        + 'Unable to communicate ' 
                        + 'with the WebSocket server.';
            $scope.status = status;
        }
    }, 60000);

    /**
     * Add message to the chat window
     */
    // function addMessage() {
    //     //content.prepend('<p> ' + event.data + '</p><hr>');
    //     //$scope.result =  result+' ºC';
    // }
});
