angular.module('fileController',['fileServices'])

.controller('fileCtrl',function($location,$timeout,File,$scope){
	
	var app = this;

	// $("#uploadInput").onchange = function(event) {
	//    console.log(event);
	// }

	// $scope.upload = function(event){
	// 	console.log(event);
	// }
	$scope.uploadFile = function(event){
        var files = event.target.files;
        app.extractText({});
    }; 

    this.extractText = function(pdfData){

    	var test = File.extract(pdfData);
    	console.log(test);
    }

	this.fillTable = function(){
		
		File.list().then(function(mydata){

			$('#fileTable').bootstrapTable({
			    columns: [{
			        field: 'filename',
			        title: 'Nome'
			    }, {
			        field: 'content',
			        title: 'Conteúdo'
			    }],
			    data: mydata.data
			});

		});

	}

	app.fillTable();

	this.regFile = function(fileData){
		app.loading = true;
		app.errorMsg = false;
		app.successMsg = false;
		app.fileData.createdAt = new Date();
		app.fileData.content = (app.fileData.content) ? app.fileData.content : "";

		File.create(app.fileData).then(function(data){

 			if(data.data.success){

 				app.successMsg = data.data.message;
				app.loading = false;
				$timeout(function(){
					$location.path('/');
				}, 2000)
				

 			} else{
 				app.errorMsg = data.data.message;
				app.loading = false;

 			}
		});
	}

	this.upload = function(){

     	console.log(2);
    	// var pdfParser = new PDFParser(this,1);
 
	    // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
	    // pdfParser.on("pdfParser_dataReady", pdfData => {
	    //     var test = pdfParser.getRawTextContent();
	    //     console.log(test);
	    // });
 
    	// pdfParser.loadPDF("./pdf2json/test/pdf/fd/form/F1040EZ.pdf");

	}


})

.directive('fileOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.fileOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});


