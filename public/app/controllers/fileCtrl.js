angular.module('fileController',['fileServices'])

.controller('fileCtrl',function($location,$timeout,File,$scope,$route){
	
	var app = this;


	$scope.uploadFile = function(event){
        var file = event.target.files[0];

        var reader = new FileReader();
		reader.onload = function(event) {
		    var contents = event.target.result;
		    var filename = window.currentRow;
		    app.extractText(contents,filename);
		};

		reader.readAsDataURL(file);

    }; 


	this.extractText = function(data,filename){
		var content = "";
		var myObj = {
			filename : filename,
			content : content
		}
		PDFJS.getDocument( data ).then( function(pdf) {
			pdf.getPage(1).then( function(page){
				page.getTextContent().then( function(textContent){
					textContent.items.forEach(function(a){
						myObj.content += a.str
					})
					app.upload(myObj);
				});
			});
		});
	}


	this.fillTable = function(){
		
		File.list().then(function(mydata){

			if(mydata.data.length){
				for(var i = 0; i < mydata.data.length; i++){
					mydata.data[i].uploadBtn = '<a class="uploadBtn" title="Upload PDF"><i class="glyphicon glyphicon-upload"></i></a>'	
				}

				$('#fileTable').bootstrapTable({
				    columns: [{
				        field: 'filename',
				        title: 'Nome'
				    }, {
				        field: 'content',
				        title: 'Conteúdo'
				    }, {
				        field: 'uploadBtn',
				        title: 'Upload PDF'
				    }],
				    data: mydata.data
				});
			} else{
				$('#fileTable').bootstrapTable({
				    columns: [{
				        field: 'filename',
				        title: 'Nome'
				    }, {
				        field: 'content',
				        title: 'Conteúdo'
				    }, {
				        field: 'uploadBtn',
				        title: 'Upload PDF'
				    }],
				    data: []
				});
				$(".no-records-found td").text('Nenhum documento encontrado.')
			}

		});

	}

	app.fillTable();

	this.regFile = function(fileData){
		app.loading = true;
		app.errorMsg = false;
		app.successMsg = false;
		app.fileData.createdAt = new Date();
		app.fileData.content = (app.fileData.content) ? app.fileData.content : "-";

		File.create(app.fileData).then(function(data){

 			if(data.data.success){

 				app.successMsg = data.data.message;
				app.loading = false;
				$route.reload();				

 			} else{
 				app.errorMsg = data.data.message;
				app.loading = false;

 			}
		});
	}

	this.upload = function(fileData){

		fileData.content = (fileData.content) ? fileData.content : "-";

		File.update(fileData).then(function(data){

 			$route.reload();

		});

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


