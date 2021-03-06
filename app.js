var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, xlUpload = require('./routes/xlUpload');

var app = express();
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', routes.index);
app.get('/users', user.list);
 

app.post('/xlUpload', xlUpload.upload, xlUpload.processUpload );

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


