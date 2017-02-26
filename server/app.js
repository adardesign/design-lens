var express = require('express');
var bodyParser= require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/../client/'));
app.use('/client', express.static(__dirname + '/../client/'));

//app.listen(app.get('port'), function() {
//	console.log('Node app is running on port', app.get('port'));
//});


var MongoClient = require('mongodb').MongoClient;
var	db;


MongoClient.connect("mongodb://adardesign:designlensmoshe@ds161099.mlab.com:61099/design-lens", (err, database) => {
    if (err) return console.log(err)
  	db = database
  	app.listen(app.get('port'), () => {
    	console.log('listening')
  })
});


app.get('/', (req, res) => {
  db.collection('commandments').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
	console.log(result[0])
	res.render('../views/index.ejs', {commandments:result[0].commandments})
  });
});

app.post('/comment', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})