var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, xlUpload = require('./routes/xlUpload')
	, multer  = require('multer');

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', routes.index);
app.get('/users', user.list);
 
var done = false;

var upload = multer({
	 dest: './public/upload/',
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
	inMemory: true
});

app.post('/xlUpload', upload, function(req, res){
	
	console.log(req.files.fileUpload.name);
	
	res.send(req.files.fileUpload.name);

	/*if(done==true){
	    console.log(req.files);
	    res.end("File uploaded.");
	  }*/
});

/*

 app.get('/cool', function(request, response) {
  response.send(cool());
});


app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})
*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


