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

function makeOrder(cart){
    socketL.emit('makeOrder', cart, (data) => {
        console.log(data)

    });

}