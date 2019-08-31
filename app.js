var express = require('express');
var app = express();
const multer  = require("multer");
var server = require('http').Server(app);
const service = require('./services.js')



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

const io = require('socket.io')();
io.on('connection', client => {
    console.log("Есть подключение")

    client.on('getData', async function(data, returnFn){

        let dataR = await service.getData(data.rest)
        returnFn(dataR)
    });

    client.on('getBaseData', async function(data, returnFn){

        let dataR = await service.getBaseData(data.rest)
        returnFn(dataR)
    });

    client.on('changePosition', async function(data, returnFn){

        let dataR = await service.changePosition(data)
        returnFn(dataR)
    });


    client.on('changeGroup', async function(data, returnFn){

        let dataR = await service.changeGroup(data)
        returnFn(dataR)
    });



});
io.listen(3333);

