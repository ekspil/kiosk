var socketL = io.connect('localhost:3333');
//var socketC = io.connect('192.168.15.150:3333');

socketL.emit('getData', {rest: 1}, (data) => {

    app.list = data.list
    app.groups = data.groups

});

socketL.emit('getBaseData', {rest: 1}, (data) => {
   console.log(data)
   app.list = data.list
   app.groups = data.groups

});

let fakeData = {
        type: 1,
        station: 1,
        blocked: false,
        hiden: false,
        name: "Тестовая хрень",
        groupId: 1,
        img: "",
        price: 999

}
let fakeGroup = {
        name: "Все, что есть",
        img: ""

}
socketL.emit('changePosition', fakeData, (data) => {
    console.log(data)

});

socketL.emit('changeGroup', fakeGroup, (data) => {
    console.log(data)

});
