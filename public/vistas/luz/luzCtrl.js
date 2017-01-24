/**
 * Created by raul on 5/12/16.
 */

var socket = io ({forceNew: true});

angular.module('smartapp').controller('luzCtrl', ['$state', '$http', '$scope', '$window', '$cookies', function ($state, $http, $scope, FlashService, $window, $cookies) {
    // var myData = [];
    // $scope.myData = [];
    $scope.myData = [];
    $scope.myData.push("Lu");
    socket.emit('Conectado observer luz');
    socket.on('lectura', function (data){
        // myData.push(data.valor);
        // $cope.myData = data.valor;
        //$scope.myData.push(data.valor);
        console.log("Dato: ", data.valor);
        console.log("$scope.myData: ", $scope.myData);
        $scope.$apply(function (){
            $scope.luz = data.valor;
            $scope.myData.push(parseInt(data.valor));
        });
    });
    $scope.return = function(){
    	$state.go('inicio');
    };
    $scope.exit = function(){
    	$state.go('login');
    };
    
}]);

// smartapp.directive("c3Graph", function() {
//     var linkFunction = function(scope) {
//         c3.generate({
//             bindto: '#chart',
//             data: {
//                 columns: scope.data
//             }
//         });
//     };

//     return {
//         link: linkFunction,
//         scope: {
//             data: '='
//         },
//         template: '<div id="chart"></div>'
//     };
// });

smartapp.directive("c3Graph", function () {
    var linkFunction = function (scope) {
        var graph = c3.generate({
            bindto: '#chart',
            data: {
                columns: scope.data
            }
        });

        scope.$watch('data', function (newData) {
            graph.load({
                columns: newData
            });
        }, true);

    };

    return {
        link: linkFunction,
        scope: {
            bindToId: '@',
            color: '@',
            data: '='
        }
    };
});


