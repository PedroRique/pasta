angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	
	$routeProvider

	.when('/',{
		templateUrl : 'app/views/pages/users/login.html'
	})

	.when('/register',{
		templateUrl : 'app/views/pages/users/register.html',
		controller : 'regCtrl',
		controllerAs : 'register'
	})

	.when('/files',{
		templateUrl : 'app/views/pages/files.html',
		controller: 'fileCtrl',
		controllerAs : 'registerFile'
	})

	.when('/login',{
		templateUrl : 'app/views/pages/users/login.html'
	})

	.otherwise({redirectTo:'/login'})


	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});
});