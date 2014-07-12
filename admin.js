var request = require('request');
var async = require('async');
var express = require('express');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//CREATE EXPRESS FRAMEWORK
var app = express();
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname+"/views");
//the session and cookie parser functions below are needed in order to implement persistent authentication
app.use(bodyParser());
app.use(cookieParser());

var server = require('http').createServer(app);
var API_KEY = 'YOUR API KEY';

//ROUTES
app.get('/', function(req,res){
    res.render('index')
});

app.post('/update', function(req,res){
    //console.log(req.body);
    var lat = req.body.lat;
    var long = req.body.long;
    
    var url = 'https://api.forecast.io/forecast/'+API_KEY+'/'+lat+','+long;
    request.get(url, function(err,response,body){
        if(err){console.log(err)}
        
        //console.log(body);
        var parse = JSON.parse(body);
        //console.log(parse)
        //console.log(parse.currently.summary);
        //console.log(parse.hourly.summary);
        //console.log(parse.daily.summary);
        res.send({currently:parse.currently.summary,hourly:parse.hourly.summary,daily:parse.daily.summary});
    })
})


server.listen(8040);
console.log("Express server started on 8040");