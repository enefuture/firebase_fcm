var http = require("http");
var url = require("url");
var querystring = require('querystring');

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    var params = "";
    request.on("data",function(chunk){
        params += chunk;
    });
    request.on("end",function(){
        try{
          params = JSON.parse(params);
          console.log(params);
          var result = route(pathname,params);
          response.writeHead(200, {"Content-Type": "application/json"});
          response.write(result);
          response.end();
        }catch(e){
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end();
        }
    });  
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;