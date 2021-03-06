angular.module('userController',['userServices'])

.controller('regCtrl',function($location,$timeout,User){
	
	var app = this;

	this.regUser = function(regData){
		app.loading = true;
		app.errorMsg = false;
		app.successMsg = false;

		User.create(app.regData).then(function(data){

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

})
