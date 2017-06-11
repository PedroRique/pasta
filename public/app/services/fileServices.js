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

	fileFactory.extract = function(pdfData){
		return $http.post('/api/extract',pdfData);
	}

	return fileFactory;
});