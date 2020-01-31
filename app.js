var express = require('express');
var app = express();
const multer  = require("multer");
var server = require('http').Server(app);
const service = require('./services.js')
const basicAuth = require('basic-auth');


app.use(express.static(__dirname+'/'));


app.use(multer({dest:"img/prod"}).single("filedata"));


const auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    };

    let user = basicAuth(req)

    if (!user || !user.name || !user.pass) {
        return unauthorized(res)
    }

    if (user.name === 'admin' && user.pass === 'locffadm') {
        return next()
    } else {
        return unauthorized(res)
    }
}


app.get('/manager.html',auth , function(req,res){
    res.sendFile(__dirname+'/manager-secret0101.html');
});


app.post("/upload/img/prod", async function (req, res, next) {
    let filedata = req.file;
    let data = {
        name: req.body.imgName,
        hiden: false,
        blocked: false,
        img: filedata.destination+"/"+filedata.filename

    }
    const imgData = await service.addImg(data)


    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.redirect("../../manager.html")
});


server.listen(88, "0.0.0.0", function(){
    var addr = server.address();
    console.log('listening on '+addr.address+':' + addr.port);
});

const io = require('socket.io')();
io.on('connection', client => {
    console.log("Есть подключение")

    client.on('makeOrder', async function(data, returnFn){

        let dataR = await service.makeOrder(data)
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

    client.on('changeLangItem', async function(data, returnFn){

        let dataR = await service.changeLangItem(data)
        returnFn(dataR)
    });


    client.on('changeGroup', async function(data, returnFn){

        let dataR = await service.changeGroup(data)
        returnFn(dataR)
    });


    client.on('changeMainScreen', async function(data, returnFn){

        let dataR = await service.changeMainScreen(data)
        returnFn(dataR)
    });

    client.on('changeHelper', async function(data, returnFn){

        let dataR = await service.changeHelper(data)
        returnFn(dataR)
    });

    client.on('findOrder', async function(data, returnFn){

        let dataR = await service.findOrder(data)
        returnFn(dataR)
    });

    client.on('checkBonus', async function(data, returnFn){

        let dataR = await service.checkBonus(data)
        returnFn(dataR)
    });
    client.on('getPin', async function(data, returnFn){

        let dataR = await service.getPin(data)
        returnFn(dataR)
    });
    client.on('minusBonus', async function(data, returnFn){

        let dataR = await service.minusBonus(data)
        returnFn(dataR)
    });
    client.on('plusBonus', async function(data, returnFn){

        let dataR = await service.plusBonus(data)
        returnFn(dataR)
    });

    client.on('deleteOrder', async function(data, returnFn){

        let dataR = await service.deleteOrder(data)
        returnFn(dataR)
    });



});
io.listen(3333);

