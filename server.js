//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');


var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

var Person = require("./PersonModel");

// use body parser so we can get info from POST and/or URL parameters
router.use(bodyParser.urlencoded({
  extended: false
}));

router.use(bodyParser.json({limit: '50mb'}));



var config = {
  "database":"mongodb://admin:adbx@ds047166.mlab.com:47166/facetracker-adbx",
  "secretKey":"THISISMY SUPERSECRET KEY"
}
router.set('superSecret', config.secretKey ); // secret variable

router.use(bodyParser.json({limit: '50mb'}));
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Connected to the database');
    //BlockCypherService.queryMissedHookResult();
  }
})


router.post("/api/people",function(req,res,next) {
  console.log("body",req.body)
  var people = req.body;
  var length = people.length;
  var successArray = [];
  var success = 0;
  var count = 0;
  people.forEach(function(person,index,array){
    Person.create(person,function(err,newPerson){
      if (!err){
        success++;
        successArray.push(person);
      }
      count++;
      if (count == length) {
          res.json({
            success: success==length,
            partialSuccess: success,
            successObject: successArray
          })
      }
    })
    
  })

})
router.get("/api/people",function(req,res,next) {
  Person.find({},function(err,people){
    console.log("people",err,people)
    if (!err) {
      res.json({
        success: true,
        data: people.reverse()
      })
    }
    else {
      res.status(500).json({
        success: false,
        err: err
      })
    }
  })

})

router.use("/",function(req,res){
  console.log("pinging")
  res.json({"msg":"Hello world"})
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
