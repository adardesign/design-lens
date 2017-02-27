var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

// ... stuff
var parseJson = bodyParser.json();

app.use(function (req, res, next) {
    req.getBody = function (callback) {
        parseJson(req, res,function (err) {
          callback(err, req.body);
        });
    };
    next();
});

app.set('view engine', 'ejs')

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/../client/'));
app.use('/client', express.static(__dirname + '/../client/'));

//app.listen(app.get('port'), function() {
//  console.log('Node app is running on port', app.get('port'));
//});


var MongoClient = require('mongodb').MongoClient;
var db;


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
    //return;
    db.collection('commandments').update({
          appName:"designLens", 
          'commandments.id': "1" 
            },
              {
                $push: { "commandments.$.comments": 
                 {
                    "name": "dd",// data.name,
                    "email": "ee",//data.email,
                    "date": "aa", //data.date, // .slice(0,15)
                    "title": "bbb",//data.title,
                    "body": "ff"// data.body
                }
                     }
     }, function(err,result){
            if (err) return res.send(err)
            res.send(data);
      });
});