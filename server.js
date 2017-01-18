var express = require('express');
var path=require('path');
var bodyParser=require('body-parser');
var songs=require('./data.json');


var app=express();

//serves up the public folder of files
app.use(express.static('public'));


//convert any url encoded body into a JS object
//added to req.body
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'public/index.html'));

});

app.get('/songs',function(req,res){
  res.send(songs);

});

app.post('/songs',function(req,res){



  if(songs[songs.length-1].title!=req.body.title&&songs[songs.length-1].artist!=req.body.artist&&songs[songs.length-1].album!=req.body.album){
    if(req.body.title!=''&&req.body.artist!=''&&req.body.album!=''){
      songs.push(req.body);
      res.sendStatus(200);
    }else{
      res.sendStatus(400);
    };
  }else{
    res.sendStatus(400);
  }
});


app.listen(3000);
