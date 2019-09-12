var socketL = io.connect('localhost:3333');
//var socketC = io.connect('192.168.15.150:3333');

// socketL.emit('getData', {rest: 1}, (data) => {
//
//     app.list = data.list
//     app.groups = data.groups
//
// });

socketL.emit('getBaseData', {rest: 1}, (data) => {
   console.log(data)
   app.list = data.list
   app.groups = data.groups
   app.imgs = data.imgs

});


function changeGroup(newGroup){
    socketL.emit('changeGroup', newGroup, (data) => {
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
        console.log(data)
        app.payHelper = "Выводим информацию на кухонные мониторы..."
        let msgId = app.litera+"-"+data.id
        SendET(app.serverET, app.cart, false, msgId, app.orderType)
        setTimeout(()=>{app.payHelper = "Готово! Ваш заказ "+app.litera+"-"+data.id}, 1500)
        setTimeout(()=>{app.payed = 1}, 3000)
        setTimeout(app.start, 10000)

    });

}