/**
 * xlUpload - process the file upload to the server
 */

var fs = require('fs'),
	multer  = require('multer');

var done = false;

app.use(multer({ dest: './uploads/',
	 rename: function (fieldname, filename) {
	    return filename+Date.now();
	  },
	onFileUploadStart: function (file) {
	  console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
	  console.log(file.fieldname + ' uploaded to  ' + file.path);
	  done=true;
	}
	}));


exports.processUpload = function(req, res){
	console.log("Processing file upload..."+req.files.file.name);
	
	if(done==true){
	    console.log(req.files);
	    res.end("File uploaded.");
	  }
	
    
	/*  
      busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
      });
      
      busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
      });*/
      
	
};