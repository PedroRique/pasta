angular.module('authServices',[])

.factory('Auth',function($http){
	
	authFactory = {};

	// User.login(regData);
	authFactory.login = function(loginData){
		return $http.post('/api/authenticate',loginData)
	}

	return authFactory;
})