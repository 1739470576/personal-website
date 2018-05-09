var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

//var connectionString = "mongodb+srv://admin:990202Gfh@fuh-tybjh.mongodb.net/test";
var connectionString = "mongodb+srv://admin:990202Gfh@cluster0-fuzfp.mongodb.net/test";

app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/',function(req,res){
	res.sendFile(__dirname + "/public/main.html");
});

app.post('/send',function(req,res){
    MongoClient.connect(connectionString, function(err,db){
        var dbo = db.db("mydb");
        var newMessage = {name:req.body.name, email: req.body.email, message: req.body.message};
        if (req.body.name && req.body.email && req.body.message){
            dbo.collection("message").insertOne(newMessage,function(err,res){
                    console.log("New User added!");
            })
            res.send('succeed');
        }
    });
});

app.get('/display',function(req,res){
  MongoClient.connect(connectionString,function(err,db){
    var dbo = db.db("mydb");
    dbo.collection("message").find({}).toArray(function(err,result){
      res.json(result);
    });
  });
});

app.get('/test',function(req,res){
  res.sendFile(__dirname + "/public/display.html");
});

app.listen(process.env.PORT || port)
