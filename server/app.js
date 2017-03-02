var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require('fs') 

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs')

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/../client/'));
app.use('/client', express.static(__dirname + '/../client/'));
//app.listen(app.get('port'), function() {
//  console.log('Node app is running on port', app.get('port'));
//});


var MongoClient = require('mongodb').MongoClient;
var db;
var offline = false;

const MONGODBUSER =  process.env.MONGODBUSER;
const MONGODBPASS = process.env.MONGODBPASS
MongoClient.connect("mongodb://"+MONGODBUSER+":"+MONGODBPASS+"@ds161099.mlab.com:61099/design-lens", (err, database) => {
    if (err) {
        // support offline, or local BU DB
        app.listen(app.get('port'), () => {
          offline = true;
          console.log('listening offline mode');
        });
        return;
    }
    db = database;
    app.listen(app.get('port'), () => {
        console.log('listening')
    })
});


app.get('/', (req, res) => {
    if(offline){
      fs.readFile('./data/commandments.json', 'utf8', (err, result) => {
        if (err) return console.log(err);
         result = JSON.parse(result);
         res.render('../views/index.ejs', {
            commandments: result.commandments,
            params: req.params,
            pageType: "home"
        });
      });    
      return;
    }
    db.collection('commandments').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('../views/index.ejs', {
            commandments: result[0].commandments,
            params: req.params,
            pageType: "home"
        })
    });
});

app.get('/commandment/:id', (req, res) => {
  var id = req.params.id;
  if(offline){
      fs.readFile('./data/commandments.json', 'utf8', (err, result) => {
        if (err) return console.log(err);
         result = JSON.parse(result);
         res.render('../views/index.ejs', {
            commandment: result.commandments[id - 1],
            params: req.params,
            pageType: "commandment"

        })
      });    
      return;
    }
    db.collection('commandments').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log(result[0].commandments[id - 1]);
        res.render('../views/index.ejs', {
            commandment: result[0].commandments[id - 1],
            params: req.params,
            pageType: "commandment"

        })
    });
});





app.post('/postComment', (req, res) => {
    var data = req.body;
    var sendData = {
              name: data.name,
              email: data.email,
              date: (data.date).slice(0,15),
              title: data.title,
              body: data.body
            };

    
    db.collection('commandments').update({
          "_id":"collection1",
          'commandments.id': "commandments_"+data.id,
        },
        {
          $push: { 
            "commandments.$.comments": sendData
        }
     }, (err, result) => {
            if (err) return res.send("err")
            res.send(sendData);
      });
});
