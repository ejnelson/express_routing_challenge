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

var count=0;
  for(var i=0;i<songs.length;i++){
    if(songs[i].title!=req.body.title||songs[i].artist!=req.body.artist||songs[i].album!=req.body.album){
      count++;

    }else{
    res.sendStatus(400);
    };
  };
  if(count==songs.length){
    if(req.body.title!=''&&req.body.artist!=''&&req.body.album!=''){
      var d=new Date();
      req.body.date=d;
      songs.push(req.body);

      console.log(req.body);
      res.sendStatus(200);
    }else{
      res.sendStatus(400);
    };
  };
});


app.listen(3000);
