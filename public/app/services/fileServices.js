angular.module('fileServices',[])

.factory('File',function($http){
	fileFactory = {};

	// File.create(fileData);
	fileFactory.create = function(fileData){
		return $http.post('/api/files',fileData);
	}

	fileFactory.list = function(){
		return $http.get('/api/files');
	}

	fileFactory.update = function(fileData){
		var req = "/api/files/:'" + fileData.filename + "'";
		return $http.post(req,fileData);
	}

	return fileFactory;
});