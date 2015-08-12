/**
 * xlUpload - process the file upload to the server
 */

var fs = require('fs');

var msg;

exports.processUpload = function(req, res){
	console.log("Processing file upload...");
	
	if(req.files != undefined){

		msg = req.files.file.filename;
		
	}
	else {
		 msg = 'no file uploaded';
	}
	
	console.log(req.files);
	
	/* 
	if(req.files != undefined){
		
		fs.readFile(req.files.file.path, function(err, data){
			
			if(err) throw err;
			
			console.log(data);
			
			var fileName = req.files.filename;
			
			res.render('index', { title: 'vLookup', message: fileName });
		});
		
	}
	else {
		res.render('index', { title: 'vLookup', message: 'no file uploaded'});
	}
	
	
	*/
	
	
};