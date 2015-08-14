/**
 * xlUpload - process the file upload to the server
 */

var fs = require('fs'),
	multer  = require('multer'),
	XLSX = require('xlsx');


var done = false;

exports.upload = multer({
	 dest: __dirname + '/upload/',
	 limits: {
	        fieldNameSize: 50,
	        files: 1,
	        fields: 5,
	        fileSize: 1024 * 1024
	    },
	 rename: function (fieldname, filename) {
	    return filename+Date.now();
	  },
	onFileUploadStart: function (file) {
	  console.log(file.originalname + ' is starting ...');
	 /* if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          return false;
      }*/
	},
	onFileUploadComplete: function (file) {
	  console.log(file.fieldname + ' uploaded to  ' + file.path);
	  done=true;
	},
});



exports.processUpload = function(req, res){

	console.log(req.files.fileUpload.name);
	var workbook = XLSX.readFile(req.files.fileUpload.path);
	
	var sheet_name_list = workbook.SheetNames;
	var xlValues = "";
	
	sheet_name_list.forEach(function(y) { /* iterate through sheets */
	  var worksheet = workbook.Sheets[y];
	  for (z in worksheet) {
	    /* all keys that do not begin with "!" correspond to cell addresses */
	    if(z[0] === '!') continue;
	    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
	    
	    xlValues += JSON.stringify(  y + "!" + z + "=" + JSON.stringify(worksheet[z].v) );
	  }
	});

	if(done==true){
	    console.log(req.files);
	    res.end("File uploaded ==>"+req.files.fileUpload.name+" \n "+xlValues);
	  }
	
};