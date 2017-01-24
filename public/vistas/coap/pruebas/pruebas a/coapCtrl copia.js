/**
 * Created by raul on 5/12/16.
 */

//var socket = io ({forceNew: true});
//var socket = io();


angular.module('smartapp', [
      'ngWebSocket' // you may also use 'angular-websocket' if you prefer
    ])
    //                          WebSocket works as well
    .factory('MyData', function($websocket) {
      // Open a WebSocket connection
      var dataStream = $websocket("ws://192.168.1.31:1337");

      var collection = [];

      dataStream.onMessage(function(message) {
        collection.push(message.data);
      });

      var methods = {
        collection: collection,
        chariot26: function() {
            var msg = 'coap://chariot.c3526.local/sensors/tmp275-c?get';
            dataStream.send(msg);
        },
        chariot27: function() {
            var msg = 'coap://chariot.c3527.local/sensors/tmp275-c?get';
            dataStream.send(msg);
        },
        chariot28: function() {
            var msg = 'coap://chariot.c3528.local/sensors/tmp275-c?get';
            dataStream.send(msg);
        },
        chariot29: function() {
            var msg = 'coap://chariot.c3529.local/sensors/tmp275-c?get';
            dataStream.send(msg);
        }
      };

      return methods;
    })
    .controller('coapCtrl', ['$state', '$http', '$scope', '$window', '$cookies' function ($state, $http, $scope, FlashService, $window, $cookies, MyData) {
        $scope.return = function(){
            $state.go('inicio');
        }
        $scope.exit = function(){
            $state.go('login');
        }

        $scope.MyData = MyData;
    }]);



// angular.module('smartapp').controller('coapCtrl', ['$state', '$http', '$scope', '$window', '$cookies', function ($state, $http, $scope, FlashService, $window, $cookies) {
//     $scope.return = function(){
//     	$state.go('inicio');
//     }
//     $scope.exit = function(){
//     	$state.go('login');
//     }

//     //var content = $('#content');
//     // var input = $('#input');
//     // var status = $('#status');

//     // my color assigned by the server
//     //var myColor = true;
//     // my name sent to the server
//     //var myName = true;
	
//     // if user is running mozilla then use it's built-in WebSocket
//     window.WebSocket = window.WebSocket || window.MozWebSocket;
	
//     // if browser doesn't support WebSocket, just show some notification and exit
//     if (!window.WebSocket) {
//         // content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
//         //                             + 'support WebSockets.'} ));
//         // input.hide();
//         // $('span').hide();
//         // return;

//         var status = 'Sorry, but your browser doesn\'t ' + 'support WebSockets.';
//         $scope.status = status;
//     }

//     // open connection--overwrite default string for your value.
// 	// var chariot = prompt("Please enter Chariot WS server: ", "ws://192.168.1.115:1337");
//     var chariot = "ws://192.168.1.31:1337";
// 	var connection = new WebSocket(chariot);
 
//     connection.onopen = function () {
//         // first we want users to enter their names
//         //input.removeAttr('disabled');
//         var status = 'Server On';
//         $scope.status = status;
//     };

//     connection.onerror = function (error) {
//         // just in case there were some problems with connection...
//         // content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
//         //                             + 'connection or the server is down.' } ));
//         var result = 'Sorry, but there\'s some problem with your ' 
//                     + 'connection or the server is down.';
//         $scope.result = result;
//     };

//     // most important part - incoming messages
//     connection.onmessage = function (event) {

// 		//input.removeAttr('disabled'); // let the user write another message
// 		//content.prepend('<p> ' +
//         //     + 'Arduino IoT: ' + event.data + '</p>');
// 		//content.prepend('<p> ' + event.data + '</p>');
   
//         // var result = event.data;
//         // if (event.data == 'chariot.c3526.local: 2.05 CONTENT  25.7(C)'){
//         //     console.log('OK');
//         //     var aux = event.data
//         //     $scope.result = aux;
//         // }else{
//         //     console.log('NO OK');
//         // }
//         // textoAreaDividido = textoArea.split(" ");
//         // numeroPalabras = textoAreaDividido.length;
//         // while (event){
//         //     var aux = event.data.substring(35,39);
//         //     var numaux = aux.length;
//         //     if (numaux == 4){
//         //         $scope.result = aux;
//         //     }
//         //     return;
//         // }
//         // var aux = event.data;
//         // var result;
//         // if (aux.length < 15){
//         //     console.log(aux);
//         // }else{
//         //     var temp = event.data;
//         //     result = event.data.substring(35,39);
//         //     //addMessage(result);
//         //     $scope.result = result+'ºC';
//         //     console.log(result);
//         //     console.log(temp);
//         // }
//         $scope.result = event.data;


//         //$scope.result = result;
//         console.log($scope.result);
//         //console.log(result);
//         // console.log('----------------');
//          // console.log('$scope: ',$scope.result);
//         // console.log('----------------');
//         // console.log('event: '+JSON.stringify(event.data));
//         // console.log('----------------');
//         // console.profile();
//         // console.trace();
//         //addMessage();
//         // var result = event.data;
//         // $scope.result = result;

//         //console.log(result);
//     };

//     /**
//      * Send mesage when user presses Enter key
//      */

//     $scope.chariot26 = function(){
//         var msg = 'coap://chariot.c3526.local/sensors/tmp275-c?get';
//         console.log(msg);
//         connection.send(msg);
//     }

//     $scope.chariot27 = function(){
//         var msg= 'coap://chariot.c3527.local/sensors/tmp275-c?get';
//         console.log(msg);
//         connection.send(msg);
//     }

//     $scope.chariot28 = function(){
//         var msg= 'coap://chariot.c3528.local/sensors/tmp275-c?get';
//         console.log(msg);
//         connection.send(msg);
//     }

//     $scope.chariot29 = function(){
//         var msg= 'coap://chariot.c3529.local/sensors/tmp275-c?get';
//         console.log(msg);
//         connection.send(msg);
//     }
//    //  input.keydown(function(e) {
//    //      if (e.keyCode === 13) {
//    //          var msg = $(this).val();
//    //          if (!msg) {
//    //              return;
//    //          }
//    //          // send the message as an ordinary text
// 			// content.prepend('<p> ' + msg + '</p>');
//    //          connection.send(msg);
//    //          $(this).val('');
//    //          // disable the input field to make the user wait until server
//    //          // sends back response
//    //          //input.attr('disabled', 'disabled');

//    //          // we know that the first message sent from a user their name
//    //          //if (myName === false) {
//    //          //    myName = msg;
//    //          //}
//    //      }
//    //  });

//     /**
//      * This method is optional. If the server wasn't able to respond to the
//      * in 30 seconds then show some error message to notify the user that
//      * something is wrong. We're talking to an Arduino WoT!
//      */
//     setInterval(function() {
//         if (connection.readyState !== 1) {
//             // status.text('Error');
//             // input.attr('disabled', 'disabled').val('Unable to communicate '
//             //                                      + 'with the WebSocket server.');
//             var status = 'Error' 
//                         + 'Unable to communicate ' 
//                         + 'with the WebSocket server.';
//             $scope.status = status;
//         }
//     }, 60000);

//     /**
//      * Add message to the chat window
//      */
//     // function addMessage() {
//     //     //content.prepend('<p> ' + event.data + '</p><hr>');
//     //     //$scope.result =  result+' ºC';
//     // }
// }]);
