var ebBlog = angular.module("ebBlog", ['ngRoute', 'ngCookies']);
ebBlog.controller('mainController', function($scope, $route, $http, $cookies){
	$scope.test = "This is the main page"
	$scope.newpost = "This is the new post page"

});

ebBlog.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'views/main.html',
		controller: 'mainController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'mainController'
	})
	.when('/newpost',{
		templateUrl: 'views/newpost.html',
		controller: 'mainController'
	})
});