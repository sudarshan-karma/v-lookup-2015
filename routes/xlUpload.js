/**
 * xlUpload - process the file upload to the server
 */

var fs = require('fs');

exports.processUpload = function(req, res){

	res.send(req.files.file.name);
	
	/*var file = req.files.file,
    path = './public/upload/';

	// Logic for handling missing file, wrong mimetype, no buffer, etc.
	
	var buffer = file.buffer, //Note: buffer only populates if you set inMemory: true.
	    fileName = file.name;
	var stream = fs.createWriteStream(path + fileName);
	stream.write(buffer);
	stream.on('error', function(err) {
	    console.log('Could not write file to memory.');
	    res.status(400).send({
	        message: 'Problem saving the file. Please try again.'
	    });
	});
	stream.on('finish', function() {
	    console.log('File saved successfully.');
	    var data = {
	        message: 'File saved successfully.'
	    };
	    res.jsonp(data);
	});
	stream.end();
	console.log('Stream ended.');	*/
};