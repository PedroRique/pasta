var User = require('../models/user');
var File = require('../models/file');
// var path = require('path');
// var filePath = path.join(__dirname, 'test/data/multipage.pdf');
// var pdfExtract = require('pdf-text-extract');
// extract(filePath, { splitPages: false }, function (err, text) {
//   if (err) {
//     console.dir(err)
//     return
//   }
//   console.dir(text)
// })

module.exports = function(router) {

	//USER REGISTRATION ROUTE
	router.get('/users',function(req,res){
		
		User.find({},function(err,users){
			if(err){
				res.send('Não foi possível listar os usuários')
			} else{
				res.send(users);
			}
		})

	});
	router.get('/users/:id',function(req,res){
		
		var id = req.param('id');
		User.findById(id,function(err,user){
			if(err){
				res.send('Não foi possível encontrar o usuário')
			} else{
				res.send(user);
			}
		})

	});
	router.post('/users',function(req,res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		
		if(user.username == "" || user.password == "" || user.username == null || user.password == null){

			res.json({success:false, message:"Preencha todos os campos!"})
		} else{
			user.save(function(err){
				if(err){
					res.json({success:false, message: "Nome de usuário já existente."})
				} else {
					res.json({success:true, message: "Usuário criado com sucesso!"})
				}
			});
		}
	});


	// FILES REGISTRATION ROUTE
	router.get('/files', function(req,res){
		
		File.find({},function(err,files){

			if(err){
				res.send('Não foi possível listar os arquivos.');
			} else{
				res.send(files);
			}

		});

	});

	router.post('/files',function(req,res){
		var file = new File();
		file.filename = req.body.filename;
		file.content = req.body.content;
		
		if(file.filename == "" || file.filename == null){
			res.json({success:false, message:'Insira o nome do arquivo!'})
		} else{
			file.save(function(err){
				if(err){
					res.json({success:false, message:'Nome do arquivo já existente.'})
				} else {
					res.json({success:true, message:'Arquivo salvo com sucesso!'})
				}
			});
		}		
	});


	//PDF EXTRACT ROUTE
	router.post('/extract',function(req,res){
		// var file = new File();
		// var test = file.extractText();
		// res.send(test);
		pdfExtract
		res.send(req.body);
	});

	//USER LOGIN ROUTE
	router.post('/authenticate',function(req,res){
		User.findOne({username:req.body.username},'username password', function(err,user){

			var valid = false;

			if(!user){
				res.json({ success:false, message: "Usuário não existente"})
			} else if(user){

				if(req.body.password){
					var valid = user.comparePassword(req.body.password);
				}else{
					res.json({success:false, message: "Insira uma senha!"})
				}				

				if(!valid){
					res.json({success:false,message: "Senha incorreta!"})
				} else{
					res.json({success: true, message: "Autenticação concluída!"})
				}
			}
			
		});
	});

	return router;
}
