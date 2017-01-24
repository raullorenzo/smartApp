/**
 * Created by raul on 5/12/16.
 */

var smartapp = angular.module('smartapp', ['ui.router', 'ngTable', 'ngResource', 'ngCookies', 'file-model', 'chart.js', 'angular-momentjs'])

smartapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: '../vistas/login/login.html',
            controller: 'loginCtrl'
        })
        .state('inicio', {
            url: '/menu',
            templateUrl: '../vistas/inicio/inicio.html',
            controller: 'inicioCtrl'
        })
        .state('dist', {
            url: '/dist',
            templateUrl: '../vistas/dist/dist.html',
            controller: 'distCtrl'
        })
        .state('luz', {
            url: '/luz',
            templateUrl: '../vistas/luz/luz.html',
            controller: 'luzCtrl'
        })
        .state('coap', {
            url: '/coap',
            templateUrl: '../vistas/coap/coap.html',
            controller: 'coapCtrl'
        })
        .state('coap_tables', {
            url: '/coap_tables',
            templateUrl: '../vistas/coap_tables/coap_tables.html',
            controller: 'coap_tablesCtrl'
        })
        .state('temp', {
            url: '/temp',
            templateUrl: '../vistas/temp/temp.html',
            controller: 'tempCtrl'
        });

    $urlRouterProvider.otherwise('login');
});
