const ioserver = document.location.host.split(":")[0]
var socketL = io.connect(ioserver+':3333');
//var socketC = io.connect('192.168.15.150:3333');

// socketL.emit('getData', {rest: 1}, (data) => {
//
//     app.list = data.list
//     app.groups = data.groups
//
// });

socketL.emit('getBaseData', {rest: 1}, (data) => {

   app.list = data.list
   app.groups = data.groups
   app.imgs = data.imgs
   app.lastId = data.lastId


    function compare(a, b) {
        if (a.name > b.name) return 1; // если первое значение больше второго
        if (a.name == b.name) return 0; // если равны
        if (a.name < b.name) return -1; // если первое значение меньше второго
    }

    app.list.sort(compare)


});


function changeGroup(newGroup){
    socketL.emit('changeGroup', newGroup, (data) => {
        console.log(data)

    });

}
function deleteOrder(ordernum){
    socketL.emit('deleteOrder', ordernum, (data) => {
        console.log(data)

    });

}
function changePosition(newPosition){
    socketL.emit('changePosition', newPosition, (data) => {
        console.log(data)

    });

}

function makeOrder(dataCart){
    socketL.emit('makeOrder', dataCart, (data) => {
        if(dataCart.fiscalNum != 0){
            app.payHelper = "Выводим информацию на кухонные мониторы"
        }

        let strId = ""
        if (String(data.id).length == 1){
            strId = "00" + data.id
        }
        if (String(data.id).length == 2){
            strId = "0" + data.id
        }
        if (String(data.id).length > 3){
            strId = String(data.id).slice(-3)
        }


        let msgId = app.litera+"-"+strId

        SendET(app.serverET, app.cart, false, msgId, app.orderType)
        app.lastId = data.id

        setTimeout(()=>{app.payHelper = "Готово! Ваш заказ "+msgId}, 2000)
        setTimeout(()=>{app.payed = 1}, 2500)
        setTimeout(app.start, 15000)

    });

}