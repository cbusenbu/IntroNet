/**
 * Created by Chas on 2/4/16.
 */
todoApp = angular.module('todoApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/todo.html',
                controller: 'TodoCtrl'
            }).otherwise({
            redirectTo: '/'
        });
    });