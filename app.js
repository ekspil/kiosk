var express = require('express');
var app = express();
const multer  = require("multer");
var server = require('http').Server(app);
//const service = require('./services.js')
//service.hello()


app.use(express.static(__dirname+'/'));
app.use(multer({dest:"img/prod"}).single("filedata"));

app.post("/upload/img/prod", function (req, res, next) {

    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});


server.listen(88, "0.0.0.0", function(){
    var addr = server.address();
    console.log('listening on '+addr.address+':' + addr.port);
});

