var express = require('express');
var app = express();
var server = require('http').Server(app);


server.listen(88, "0.0.0.0", function(){
    var addr = server.address();
    console.log('listening on '+addr.address+':' + addr.port);
});

app.use(express.static(__dirname+'/'));
if(!null){
    console.log(Number(null))
}
else {


    console.log("Not NULL")
}