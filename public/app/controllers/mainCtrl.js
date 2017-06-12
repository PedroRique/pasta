angular.module('mainController',['authServices'])

.controller('mainCtrl',function($timeout,$location,Auth){
	
	var app = this;

	this.doLogin = function(loginData){
		app.loading = true;
		app.errorMsg = false;
		app.successMsg = false;

		Auth.login(app.loginData).then(function(data){

 			if(data.data.success){

 				app.successMsg = data.data.message;
				app.loading = false;
				$timeout(function(){
					app.errorMsg = false;
					app.successMsg = false;
					$location.path('/files');
				}, 2000)
				

 			} else{
 				app.errorMsg = data.data.message;
				app.loading = false;

 			}
		});
	}

	this.goRegister = function(){
		$location.url('/register');
	}

})


