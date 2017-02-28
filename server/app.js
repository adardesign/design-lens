var express = require('express');
var bodyParser = require('body-parser')
var app = express();

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

const MONGODBUSER =  process.env.MONGODBUSER;
const MONGODBPASS = process.env.MONGODBPASS
MongoClient.connect("mongodb://"+MONGODBUSER+":"+MONGODBPASS+"@ds161099.mlab.com:61099/design-lens", (err, database) => {
    if (err) return console.log(err)
    db = database;
    app.listen(app.get('port'), () => {
        console.log('listening')
    })
});


app.get('/', (req, res) => {
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
