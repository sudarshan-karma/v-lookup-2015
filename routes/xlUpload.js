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
	var m = {};
	
	sheet_name_list.forEach(function(y) { /* iterate through sheets */
	  var worksheet = workbook.Sheets[y];
	  var x = {};
	  
	  for (z in worksheet) {
		 
	    /* all keys that do not begin with "!" correspond to cell addresses */
	    if(z[0] === '!') {
	    	x[z] = worksheet['!ref'];
	    	continue;
	    }
	    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
	     x[z] = worksheet[z].v;
	  }
	  
	  m[y] = x;
	  
//	 console.log("***********************************************************");
//	 console.log(XLSX.utils.sheet_to_json(worksheet));
	  
	});

	if(done==true){
	    console.log(req.files);
	    res.end(JSON.stringify({'sheets': m}) );
	  }
	
};



/**
 * 
 * File Drag and Drop code using FileDrop.js
 * 
 
 // We can deal with iframe uploads using this URL:
			var options = {iframe: {url: '/xlUpload'}};
			
			// 'zone' is an ID but you can also give a DOM node:
			var zone = new FileDrop('xlDrop', options);
			
			// Do something when a user chooses or drops a file:
			zone.event('send', function (files) {
			 	
			  // FileList might contain multiple items.
			  files.each(function (file) {
					
			  	// Reset the progress when a new upload starts:
			    file.event('sendXHR', function () {
			      fd.byID('progress-bar').style.width = 0
			    })
			
			    // Update progress when browser reports it:
			    file.event('progress', function (current, total) {
			      var width = current / total * 100 + '%'
			      fd.byID('progress-bar').style.width = width
			    })	
	
			  	// React on successful AJAX upload:
			    file.event('done', function (xhr) {
			      // Here, 'this' points to fd.File instance.
			      alert(xhr.responseText)
			    })
				
				file.event('error', function (e, xhr) {
			      
			      if (xhr.readyState == 4 && !xhr.status) {
			        alert('Timeout reached, request aborted.')
			      } else {
			        alert(xhr.status + ', ' + xhr.statusText)
			      }
			    })	
			
			
			    // Send the file:
			    file.sendTo('/xlUpload');
			
			  });
			});	
			
			
			**/
