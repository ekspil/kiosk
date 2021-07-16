const ioserver = document.location.host.split(":")[0]
    //document.location.host.split(":")[0]
let socketL = io.connect(ioserver+':3333');
    //io.connect(ioserver+':3333');
let mainGroup = 1
let socketC = io.connect(centralServer+':3333');



socketC.emit('getBaseData', {rest: 1}, (data) => {
    data.list = data.list.map(item => {
        if(item.img.indexOf('http://') == -1){
            item.img = 'http://'+centralServer+':88/'+item.img
        }
        switch (priceCat) {
            case 1: item.price = item.price; break;
            case 2: item.price = item.price2; break;
            case 3: item.price = item.price3; break;
            case 4: item.price = item.price4; break;
            case 5: item.price = item.price5; break;
            default: item.price = item.price;
        }

        return item
    })
    data.groups = data.groups.map(item => {
        if(item.img.indexOf('http://') == -1){
            item.img = 'http://'+centralServer+':88/'+item.img
        }
        return item
    })
    data.imgs = data.imgs.map(item => {
        if(item.img.indexOf('http://') == -1){
            item.img = 'http://'+centralServer+':88/'+item.img
        }
        return item
    })

    app.list = data.list
    app.groups = data.groups
    app.imgs = data.imgs
    app.mainScreens = data.mainScreens
    app.helpers = data.helpers
    data.langs = data.langs.map(lang => {
        lang.button = "Сохранить"
        return lang
    })
    let langs = {}
    for(let item of data.langs){
        langs[item.name]=item
    }
    app.langs = langs



    function compare(a, b) {
        let compA = a.groupId + "-" + a.position + "-" + a.name
        let compB = b.groupId + "-" + b.position + "-" + b.name
        if (compA > compB) return 1; // если первое значение больше второго
        if (compA == compB) return 0; // если равны
        if (compA < compB) return -1; // если первое значение меньше второго
    }
    function compareG(a, b) {
        let compA = a.position + a.name
        let compB = b.position + b.name
        if (compA > compB) return 1; // если первое значение больше второго
        if (compA == compB) return 0; // если равны
        if (compA < compB) return -1; // если первое значение меньше второго
    }

    app.list.sort(compare)
    app.groups.sort(compareG)

    for(let i in app.groups){
        if(!app.groups[i].blocked){
            app.groupId = app.groups[i].id
            mainGroup = app.groups[i].id
            break
        }

    }
    if(app.getAllUrlParams().terminal){
        app.groupId = 0
    }




});

socketL.emit('getBaseData', {rest: 1}, (data) => {
    console.log(data)
   app.lastId = data.lastId


});


function checkBonus(number){
    console.log("Check")
    socketL.emit('checkBonus', number, (data) => {
        console.log(data)
        if(data.error == 1){

            UIkit.notification( {message: "<h3 class='uk-card-title uk-text-center'>Ошибка! Возможно номер не зарегистрирован. Пройдите на кассу для регистрации.</h3>", pos: 'top-center', status:'warning', timeout: 2000})
            app.phone = {
                enter: false,
                number: "",
                sum: "",
                pin: "",
                pinUser: "",
                ok: false,
                pinErrors: 0
            }
        }else{
            app.phone.sum = data.sum
        }


    });

}

function minusBonus(number, sum, pin){
    const sendData = {
        number,
        sum,
        pin
    }
    socketL.emit('minusBonus', sendData, (data) => {
        if(data.error == false){
            app.phone.ok = true
            let slip = []
            setTimeout(()=>{app.payHelper = "Печатаем чек..."}, 100)
            let newId = app.lastId + 1
            let strId = ""
            if (String(newId).length == 1){
                strId = "00" + newId
            }
            if (String(newId).length == 2){
                strId = "0" + newId
            }
            if (String(newId).length >= 3){
                strId = String(newId).slice(-3)
            }
            strId = app.litera+"-"+strId
            app.printSlip(slip, strId)
        }else{
            app.payHelper = "Ошибка списания бонусов"
            setTimeout(() =>{UIkit.modal('#modal-pay').hide()}, 2000)
        }


    });

}

function getPin(number, sum){
    const sendData = {
        number,
        sum
    }
    socketL.emit('getPin', sendData, (data) => {
        app.phone.pin = data.pin
        app.pay("enterPin")

    });

}

function plusBonus(number, sum){
    const sendData = {
        number,
        sum
    }
    socketL.emit('plusBonus', sendData, (data) => {

            let slip = []
            setTimeout(()=>{this.payHelper = "Печатаем чек..."}, 100)
            let newId = app.lastId + 1
            let strId = ""
            if (String(newId).length == 1){
                strId = "00" + newId
            }
            if (String(newId).length == 2){
                strId = "0" + newId
            }
            if (String(newId).length >= 3){
                strId = String(newId).slice(-3)
            }
            strId = app.litera+"-"+strId


    });

}

function changeGroup(newGroup){
    socketL.emit('changeGroup', newGroup, (data) => {
        console.log(data)

    });

}

function changeMainScreen(newMainScreen){
    socketL.emit('changeMainScreen', newMainScreen, (data) => {
        console.log(data)

    });

}
function changeHelper(helper){
    console.log(helper)
    socketL.emit('changeHelper', helper, (data) => {
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
function delPosition(newPosition){
    socketL.emit('delPosition', newPosition, (data) => {
        console.log(data)

    });

}
async function saveLangItem(lamgItem, property){
    app.langs[property].button = "Ждите..."
    socketL.emit('changeLangItem', lamgItem, (data) => {
        if(data == true) {
            app.langs[property].button = "Готово!"

            setTimeout(()=>{app.langs[property].button = "Сохранить"}, 1000)
        }
        else{
            app.langs[property].button = "Ошибка!"

            setTimeout(()=>{app.langs[property].button = "Сохранить"}, 1000)
        }
        return data

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
        if (String(data.id).length >= 3){
            strId = String(data.id).slice(-3)
        }


        let msgId = app.litera+"-"+strId
        let message = false
        if(dataCart.error){
            message = dataCart.error
        }
        SendET(serverEO, app.cart, message, msgId, app.orderType)
        app.lastId = data.id

        if(app.getAllUrlParams().terminal){
            setTimeout(()=>{app.payHelper = "Готово! Ваш заказ "+msgId}, 2000)
            app.payed = 1
            setTimeout(app.start, 15000)
        }
        else{

            setTimeout(()=>{app.payHelper = "Готово! Ваш заказ "+msgId}, 2000)
            setTimeout(()=>{app.payed = 1}, 2500)
            setTimeout(app.start, 15000)

        }


    });

}

window.addEventListener('touchmove', ev => {
    if (ev.touches.length > 1) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    };
}, { passive: false });

window.addEventListener('touchstart', ev => {
    if (ev.touches.length > 1) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    };
}, { passive: false });

window.addEventListener('touchend', ev => {
    if (ev.touches.length > 1) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    };
}, { passive: false });




