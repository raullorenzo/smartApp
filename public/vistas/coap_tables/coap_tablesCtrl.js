/**
 * Created by raul on 5/12/16.
 */

'use strict';

smartapp.factory("Temps", function ($resource, $stateParams) {
    return $resource('/temp/GetTempP'); //la url donde queremos consumir
});
var datos;
smartapp.controller('coap_tablesCtrl', function ($state, $http, $scope, $location, Temps, $stateParams, ngTableParams, $window, $moment) {
    function start(){
        var dateNow = new Date().getTime();
        var loc26 = [];
        var loc27 = [];
        var loc28 = [];
        var loc29 = [];
        var temp26 = [];
        var temp27 = [];
        var temp28 = [];
        var temp29 = [];
        var data26 = [];
        var data27 = [];
        var data28 = [];
        var data29 = [];
        var currentDay = moment(dateNow).calendar();
        console.log(currentDay);
        moment.updateLocale('es', {
            calendar : {
                lastDay : '[Ayer a las] LT',
                sameDay : '[Hoy a las] LT',
                lastWeek : '[último] dddd [a las] LT',
                nextWeek : 'dddd [a las] LT',
                sameElse : 'L'
            }
        });
        $http.get('/temp/GetTemp')
            .success(function (data) {
                $scope.temps = data;            
                for (var i=0; i<data.length; i++){
                    if (data[i].location == 'chariot.c3526'){
                        // console.log('entro 1', data[i].location);
                        loc26.push(data[i].location);
                        temp26.push(data[i].temperature);
                        var myDate26 = +new Date(data[i].created);
                        var currentDay26 = moment(myDate26).calendar();
                        data26.push(currentDay26);
                    } else if (data[i].location == 'chariot.c3527'){
                        // console.log('entro 2', data[i].location);
                        loc27.push(data[i].location);
                        temp27.push(data[i].temperature);
                        var myDate27 = +new Date(data[i].created);
                        var currentDay27 = moment(myDate27).calendar();
                        data27.push(currentDay27);
                    } else if(data[i].location == 'chariot.c3528'){
                        // console.log('entro 3', data[i].location);
                        loc28.push(data[i].location);
                        temp28.push(data[i].temperature);
                        var myDate28 = +new Date(data[i].created);
                        var currentDay28 = moment(myDate28).calendar();
                        data28.push(currentDay28);
                    } else if(data[i].location == 'chariot.c3529'){
                        // console.log('entro 4', data[i].location);
                        loc29.push(data[i].location);
                        temp29.push(data[i].temperature);
                        var myDate29 = +new Date(data[i].created);
                        var currentDay29 = moment(myDate29).calendar();
                        data29.push(currentDay29);
                    }
                }

                function dateTemp(data26,data27,data28,data29){
                    if(data26.length > data27.length){
                        console.log('data26',data26.length);
                        return data26;
                    }else if(data27.length > data28.length){
                        console.log('data27',data27.length);
                        return data27;
                    }else if(data28.length > data29.length){
                        console.log('data28',data28.length);
                        return data28;
                    }else{
                        console.log('data29',data29.length);
                        return data29;
                    }

                }
                
                // console.log(loc29);
                // console.log(data29);
                // console.log(loc29[5]);
                // console.log(temp29[5]);
                // console.log(data29[5]);

                // $scope.labels = dateTemp(data26,data27,data28,data29);
                $scope.labels = dateTemp(data26,data27,data28,data29);
                $scope.series = [KITCHEN, OFFICE, BATHROOM, BEDROOM];
                $scope.data = [
                    temp26,
                    temp27,
                    temp28,
                    temp29
                ];
                $scope.labels2 = data26;
                $scope.series2 = [KITCHEN];
                $scope.data2 = [
                    temp26
                ];
                $scope.labels3 = data27;
                $scope.series3 = [OFFICE];
                $scope.data3 = [
                    temp27
                ];
                $scope.labels4 = data28;
                $scope.series4 = [BATHROOM];
                $scope.data4 = [
                    temp28
                ];
                $scope.labels5 = data29;
                $scope.series5 = [BEDROOM];
                $scope.data5 = [
                    temp29
                ];
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
                $scope.options = {
                    scales: {
                        yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                        ]
                    }
                };
        });

        $scope.return = function(){
            console.log('function return');
            $state.go('inicio');
        }
        $scope.exit = function(){
            console.log('function exit');
            $state.go('login');
        }
        $scope.reload = function(){
            console.log('function reload');
            // $state.transitionTo($state.current, $stateParams, {
            //     reload: true,
            //     inherit: false,
            //     notify: true
            // });
            //$location.path('/coap_tables');
            $window.location.reload();
        }

        console.log('***:',$stateParams);

    }
    start();

    setInterval(start, 20000);

    var location = $stateParams.location;
    var params;
    var settings;


        params =
        {
            page: 1,
            count: 4
        };
        settings =
        {
            total: 0,
            counts: [4, 8, 16, 32, 96, 192, 288],
            filterDelay: 100,
            getData: function ($defer, params) {
                Temps.get(params.url(), function (response) {
                    params.total(response.total);
                    $defer.resolve(response.results);

                });
            }
        };

    $scope.tableParams = new ngTableParams(params, settings);
    $scope.demotableParams = new ngTableParams(params, settings);
    console.log('$scope.tableParams:',$scope.tableParams);
    // $scope.find = function () {
    //     var temps = {}
    //     return $http.get('/temp/GetTempbyLoc')
    //         .success(function (data) {
    //             $scope.temps = data;
    //             console.log('temps:',temps);
    //         })
    // };
});
